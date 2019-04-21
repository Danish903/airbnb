import { Mutation, Arg, Query, Ctx, UseMiddleware } from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { Listing } from "../../entity/Listing";
import { Message } from "../../entity/Message";
import { isAuth } from "../middleware/isAuth";

export class MessageResolver {
   @UseMiddleware(isAuth)
   @Query(() => [Message])
   async findMessages(
      @Arg("listingId") listingId: string,
      @Ctx() ctx: MyContext
   ): Promise<Message[]> {
      return await Message.find({
         where: { listingId, userId: ctx.req.session!.userId }
      });
   }

   @Mutation(() => Boolean)
   async createMessage(
      @Arg("listingId") listingId: string,
      @Arg("text") text: string,
      @Ctx() ctx: MyContext
   ): Promise<Boolean> {
      if (!ctx.req.session) return false;
      const userId = ctx.req.session.userId;
      const listing = await Listing.findOne(listingId);
      if (!listing) throw new Error("Listing not available to send a message.");

      await Message.create({
         listingId,
         text,
         userId
      }).save();

      return true;
   }
}
