import {
   Resolver,
   Mutation,
   Arg,
   UseMiddleware,
   Query,
   Ctx
} from "type-graphql";

import { isAuth } from "../middleware/isAuth";
import { ListingInput } from "./listingInput/listingInput";
import { MyContext } from "../../types/MyContext";
import { Listing } from "../../entity/Listing";

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
      // console.log(listings);
      // return listings;
   }

   @UseMiddleware(isAuth)
   @Mutation(() => Boolean)
   async createListingResolver(
      @Arg("data")
      data: ListingInput,
      @Ctx() ctx: MyContext
   ): Promise<Boolean> {
      const user = ctx.req.session!.userId;
      await Listing.create({
         ...data,
         user
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

      console.log(user);

      return true;
   }
}

export { CreateListingResovler as default };
