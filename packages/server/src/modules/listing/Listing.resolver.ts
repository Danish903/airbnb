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
import { LISTING_CACHE_KEY } from "../../index";

const processUpload = async (
   filename: string,
   createReadStream: () => Stream
): Promise<{ id: string; path: string; imageName: string }> => {
   const id = shortid.generate();
   const imageName = `${id}-${filename}`;
   const path = __dirname + `/../../../images/${imageName}`;

   return new Promise(async (res, rej) =>
      createReadStream()
         .pipe(createWriteStream(path))
         .on("finish", () => res({ id, path, imageName }))
         .on("error", () => rej({ id: "", path: "", imageName: "" }))
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
   async findListings(@Ctx() ctx: MyContext): Promise<Listing[]> {
      const listings = (await ctx.redis.lrange(LISTING_CACHE_KEY, 0, -1)) || [];
      return listings.map((x: string) => JSON.parse(x));

      // return Listing.find();
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

      const { imageName } = await processUpload(filename, createReadStream);

      const listing = await Listing.create({
         ...data,
         pictureURL: imageName,
         userId: user
      }).save();

      await ctx.redis.lpush(LISTING_CACHE_KEY, JSON.stringify(listing));
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
