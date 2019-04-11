import { Field, ID, ObjectType, Ctx } from "type-graphql";
import {
   BaseEntity,
   Column,
   Entity,
   OneToMany,
   PrimaryGeneratedColumn
} from "typeorm";
import { MyContext } from "../types/MyContext";
import { AuthorBook } from "./AuthorBook";
import { User } from "./User";
// import { MyContext } from "src/types/MyContext";

@ObjectType()
@Entity()
export class Book extends BaseEntity {
   @Field(() => ID)
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Field()
   @Column()
   name: string;

   @OneToMany(() => AuthorBook, ab => ab.book)
   authorConnection: Promise<AuthorBook[]>;

   @Field(() => [User])
   async authors(@Ctx() ctx: MyContext): Promise<User[]> {
      // console.log("===========", ctx.authorsLoader);
      return ctx.authorsLoader.load(this.id);
   }
}
