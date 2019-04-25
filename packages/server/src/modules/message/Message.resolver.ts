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
   Args,
   ObjectType
} from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { Listing } from "../../entity/Listing";
import { Message } from "../../entity/Message";
import { isAuth } from "../middleware/isAuth";
import { mutationType } from "../../types/MutationTypes";
import { NewMessagePayload } from "./NewMessage.interface";
import { getConnection } from "typeorm";

@ArgsType()
export class NewMessageArgs {
   @Field(() => ID)
   listingId: string;
}

@ObjectType()
export class MessageResonse {
   @Field({ nullable: true })
   node: Message;
   @Field()
   mutation: mutationType;
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
      // await notifyAboutNewMessage({
      //    mutation: mutationType.CREATED,
      //    listingId: message.listingId,
      //    id: message.id,
      //    text: message.text,
      //    userId: message.userId
      // });
      await notifyAboutNewMessage({
         mutation: mutationType.CREATED,
         node: message
      });
      return true;
   }

   @Mutation(() => Boolean)
   async deleteMessage(
      @Arg("textId") textId: string,
      @Ctx() ctx: MyContext,
      @PubSub(NEW_MESSAGE) notifyAboutNewMessage: Publisher<NewMessagePayload>
   ): Promise<Boolean> {
      if (!ctx.req.session) return false;
      const userId = ctx.req.session.userId;
      if (!userId) throw new Error("not authenticated");
      const message = await Message.findOne(textId);
      if (!message) throw new Error("unable to delete message.");

      await notifyAboutNewMessage({
         mutation: mutationType.DELETED,
         node: message
      });

      await getConnection()
         .createQueryBuilder()
         .delete()
         .from(Message)
         .where("id = :id", { id: textId })
         .execute();

      return true;
   }
   @Subscription(() => MessageResonse, {
      topics: NEW_MESSAGE,
      filter: ({
         payload,
         args
      }: ResolverFilterData<NewMessagePayload, NewMessageArgs>) => {
         return payload.node.listingId === args.listingId;
      }
   })
   async newMessage(
      @Root()
      message: NewMessagePayload,
      //@ts-ignore
      @Args("listingId") { listingId }: NewMessageArgs
   ): Promise<NewMessagePayload> {
      console.log(message);
      return message;
   }
}
