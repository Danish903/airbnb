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
}

export { CreateListingResovler as default };
