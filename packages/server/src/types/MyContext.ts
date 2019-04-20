import { Request, Response } from "express";
import {
   createAuthorsLoader,
   createBooksLoader,
   createListingsLoader
} from "../utilities/authorsLoader";

export interface MyContext {
   req: Request;
   res: Response;
   authorsLoader: ReturnType<typeof createAuthorsLoader>;
   booksLoader: ReturnType<typeof createBooksLoader>; ///</typeof>
   listingsLoader: ReturnType<typeof createListingsLoader>;
   url: string;
}
