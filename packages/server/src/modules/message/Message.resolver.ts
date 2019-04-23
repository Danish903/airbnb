import {
   Mutation,
   Arg,
   Query,
   Ctx,
   UseMiddleware,
   Subscription,
   Resolver,
   Root,
   ArgsType,
   Field,
   PubSub,
   ID,
   ResolverFilterData,
   Publisher,
   Args
} from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { Listing } from "../../entity/Listing";
import { Message } from "../../entity/Message";
import { isAuth } from "../middleware/isAuth";
import { mutationType } from "../../types/MutationTypes";
import { NewMessagePayload } from "./NewMessage.interface";

@ArgsType()
export class NewMessageArgs {
   @Field(() => ID)
   listingId: string;
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
      @PubSub(NEW_MESSAGE) notifyAboutNewMessage: Publisher<NewMessagePayload>
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

      // await pubSub.publish(NEW_MESSAGE, message);
      await notifyAboutNewMessage({
         mutation: mutationType.CREATED,
         listingId: message.listingId,
         id: message.id,
         text: message.text,
         userId: message.userId
      });
      return true;
   }

   @Subscription(() => Message, {
      topics: NEW_MESSAGE,
      filter: ({
         payload,
         args
      }: ResolverFilterData<NewMessagePayload, NewMessageArgs>) => {
         return payload.listingId === args.listingId;
      }
   })
   async newMessage(
      @Root()
      message: NewMessagePayload,
      //@ts-ignore
      @Args("listingId") { listingId }: NewMessageArgs
   ): Promise<NewMessagePayload> {
      return message;
   }
}
