import {
   Resolver,
   Mutation,
   Arg,
   UseMiddleware,
   Query,
   Ctx
} from "type-graphql";

import shortid from "shortid";

import { isAuth } from "../middleware/isAuth";
import { ListingInput } from "./listingInput/listingInput";
import { MyContext } from "../../types/MyContext";
import { Listing } from "../../entity/Listing";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../../types/Upload";
import { createWriteStream } from "fs";
import { Stream } from "stream";

const processUpload = async (
   filename: string,
   createReadStream: () => Stream
): Promise<{ id: string; path: string }> => {
   const id = shortid.generate();
   const path = __dirname + `/../../../images/${id}-${filename}`;
   return new Promise(async (res, rej) =>
      createReadStream()
         .pipe(createWriteStream(path))
         .on("finish", () => res({ id, path }))
         .on("error", () => rej({ id: "", path: "" }))
   );
};
@Resolver()
class CreateListingResovler {
   @UseMiddleware(isAuth)
   @Query(() => String)
   async helloWorld() {
      return "Hello World";
   }

   @Query(() => [Listing])
   async findListings(): Promise<Listing[]> {
      return Listing.find();
   }

   @UseMiddleware(isAuth)
   @Mutation(() => Boolean)
   async createListing(
      @Arg("data")
      data: ListingInput,
      @Arg("file", () => GraphQLUpload, { nullable: true })
      { filename, createReadStream }: Upload,
      @Ctx()
      ctx: MyContext
   ): Promise<Boolean> {
      const user = ctx.req.session!.userId;

      const { path } = await processUpload(filename, createReadStream);

      await Listing.create({
         ...data,
         pictureURL: path,
         userId: user
      }).save();
      return true;
   }
   @UseMiddleware(isAuth)
   @Mutation(() => Boolean)
   async deleteListing(
      @Arg("listingId")
      listingId: string,
      @Ctx() ctx: MyContext
   ): Promise<Boolean | Error> {
      const user = ctx.req.session!.userId;

      try {
         const listing = await Listing.findOne({ where: { id: listingId } });

         if (listing!.userId !== user) {
            throw new Error("not authorized!");
         }
         await Listing.remove(listing!);
      } catch (error) {
         throw new Error(error);
      }

      return true;
   }
}

export { CreateListingResovler };
