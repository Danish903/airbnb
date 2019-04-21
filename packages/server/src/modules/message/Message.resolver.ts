import {
   Mutation,
   Arg,
   Query,
   Ctx,
   UseMiddleware,
   Subscription,
   PubSub,
   PubSubEngine,
   Resolver,
   Root
} from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { Listing } from "../../entity/Listing";
import { Message } from "../../entity/Message";
import { isAuth } from "../middleware/isAuth";
// import { User } from "server/src/entity/User";

export interface NotificationPayload {
   id: string;
   text?: string;
}

const NEW_MESSAGE = "NEW_MESSAGE";

@Resolver(Message)
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
      @Ctx() ctx: MyContext,
      @PubSub() pubSub: PubSubEngine
   ): Promise<Boolean> {
      if (!ctx.req.session) return false;
      const userId = ctx.req.session.userId;
      if (!userId) throw new Error("not authenticated");
      const listing = await Listing.findOne(listingId);
      if (!listing) throw new Error("Listing not available to send a message.");

      const message = await Message.create({
         listingId,
         text,
         userId
      }).save();

      await pubSub.publish(NEW_MESSAGE, message);

      return true;
   }

   @Subscription(() => Message, { topics: NEW_MESSAGE })
   async newMessage(
      @Root()
      message: Message
   ): Promise<Message> {
      return message;
   }
}
