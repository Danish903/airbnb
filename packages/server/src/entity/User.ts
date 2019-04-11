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
import { MyContext } from "src/types/MyContext";

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

   @Field(() => [Book])
   async books(@Ctx() ctx: MyContext): Promise<Book[]> {
      // console.log("===========", ct);
      return ctx.booksLoader.load(this.id);
   }
}
