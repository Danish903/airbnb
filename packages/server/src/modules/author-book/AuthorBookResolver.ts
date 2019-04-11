import {
   Resolver,
   Mutation,
   Arg,
   UseMiddleware,
   Ctx,
   Query
} from "type-graphql";
import { Book } from "../../entity/Book";
import { AuthorBook } from "../../entity/AuthorBook";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class AuthorBookResolver {
   @Query(() => [Book])
   async books() {
      return Book.find();
   }
   @Mutation(() => Book)
   async createBook(@Arg("name") name: string) {
      return Book.create({ name }).save();
   }

   @UseMiddleware(isAuth)
   @Mutation(() => Boolean)
   async createAuthorBook(@Arg("name") name: string, @Ctx() ctx: MyContext) {
      const authorId = ctx.req.session!.userId;
      const newBook = await Book.create({ name }).save();
      const bookId = newBook.id;
      await AuthorBook.create({ authorId, bookId }).save();
      return true;
   }
}
