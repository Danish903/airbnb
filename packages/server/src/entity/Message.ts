import {
   BaseEntity,
   PrimaryGeneratedColumn,
   Entity,
   Column,
   ManyToOne
} from "typeorm";
import { ObjectType, Field, ID, Ctx, Root } from "type-graphql";

import { User } from "./User";
import { Listing } from "./Listing";
import { MyContext } from "../types/MyContext";
import { mutationType } from "../types/MutationTypes";

@ObjectType()
@Entity("messages") // messages table name for the db
export class Message extends BaseEntity {
   @Field(() => ID)
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Field()
   @Column("text")
   text: string;

   @Column("uuid")
   userId: string;
   @ManyToOne(() => User, { onDelete: "CASCADE" })
   user: User;

   @Field()
   @Column("uuid")
   listingId: string;
   @ManyToOne(() => Listing, { onDelete: "CASCADE" })
   listing: Listing;

   @Field(() => User)
   async sender(@Root() parent: Message, @Ctx() ctx: MyContext): Promise<User> {
      return await ctx.usersLoader.load(parent.userId);
   }
   @Field({ nullable: true })
   mutation: mutationType;
}
