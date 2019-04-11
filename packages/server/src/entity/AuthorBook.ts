import {
   BaseEntity,
   Entity,
   JoinColumn,
   ManyToOne,
   PrimaryColumn
} from "typeorm";

import { Book } from "./Book";
import { User } from "./User";

@Entity()
export class AuthorBook extends BaseEntity {
   @PrimaryColumn()
   authorId: string;

   @PrimaryColumn()
   bookId: string;

   @ManyToOne(() => User, user => user.bookConnection, { primary: true })
   @JoinColumn({ name: "authorId" })
   user: Promise<User>;

   @ManyToOne(() => Book, book => book.authorConnection, {
      primary: true
   })
   @JoinColumn({ name: "bookId" })
   book: Promise<Book>;
}
