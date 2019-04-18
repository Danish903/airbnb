import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   BaseEntity,
   OneToMany
} from "typeorm";
import { ObjectType, Field, ID, Root, Ctx } from "type-graphql";
import { AuthorBook } from "./AuthorBook";
import { Book } from "./Book";
import { MyContext } from "../types/MyContext";
import { Listing } from "./Listing";

@ObjectType()
@Entity()
export class User extends BaseEntity {
   @Field(() => ID)
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Field()
   @Column()
   firstName: string;

   @Field()
   @Column()
   lastName: string;

   @Field()
   @Column("text", { unique: true })
   email: string;

   @Field()
   name(@Root() parent: User): string {
      return `${parent.firstName} ${parent.lastName}`;
   }
   @Column("bool", { default: false })
   confirmed: boolean;

   @Column()
   password: string;

   @OneToMany(() => AuthorBook, ab => ab.user)
   bookConnection: Promise<AuthorBook[]>;

   @OneToMany(() => Listing, listing => listing.user)
   listings: Listing[];

   @Field(() => [Listing])
   async userListings(@Root() parent: User): Promise<Listing[]> {
      return await await Listing.find({
         where: { userId: parent.id }
      });
   }

   @Field(() => [Book])
   async books(@Ctx() ctx: MyContext): Promise<Book[]> {
      return ctx.booksLoader.load(this.id);
   }
}
