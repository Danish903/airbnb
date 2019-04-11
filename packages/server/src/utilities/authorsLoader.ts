import DataLoader from "dataloader";
import { In } from "typeorm";
import { User } from "../entity/User";
import { AuthorBook } from "../entity/AuthorBook";
import { Book } from "src/entity/Book";

const batchAuthors = async (bookIds: string[]) => {
   const authorBooks = await AuthorBook.find({
      join: {
         alias: "authorBook",
         innerJoinAndSelect: {
            user: "authorBook.user"
         }
      },
      where: {
         bookId: In(bookIds)
      }
   });

   const bookIdToAuthors: { [key: string]: User[] } = {};

   /*
  {
    authorId: 1,
    bookId: 1,
    __author__: { id: 1, name: 'author1' }
  }
  */
   authorBooks.forEach(ab => {
      if (ab.bookId in bookIdToAuthors) {
         bookIdToAuthors[ab.bookId].push((ab as any).__user__);
      } else {
         bookIdToAuthors[ab.bookId] = [(ab as any).__user__];
      }
   });
   return bookIds.map(bookId => bookIdToAuthors[bookId]);
};

export const createAuthorsLoader = () => new DataLoader(batchAuthors);

const batchBooks = async (userIds: string[]) => {
   // userIds = ["id: 1", "id: 2"]
   const authorBooks = await AuthorBook.find({
      join: {
         alias: "authorBook",
         innerJoinAndSelect: {
            book: "authorBook.book"
         }
      },
      where: {
         userId: In(userIds)
      }
   });

   /*
  authorBooks = 
  {
    authorId: 1,
    bookId: 1,
    __book__: { id: 1, name: 'book1' }
  }
  */

   console.log(authorBooks);

   const bookIdToAuthors: { [key: string]: Book[] } = {};

   authorBooks.forEach(ab => {
      if (ab.authorId in bookIdToAuthors) {
         bookIdToAuthors[ab.authorId].push((ab as any).__book__);
      } else {
         bookIdToAuthors[ab.authorId] = [(ab as any).__book__];
      }
   });
   /*

   bookdIdAuthors["sdfsdfasdfasdf": [__book_: { id: 1, name : "book1" }]]
   */

   return userIds.map(userId => bookIdToAuthors[userId]);
};

export const createBooksLoader = () => new DataLoader(batchBooks);
