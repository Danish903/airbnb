import { Request, Response } from "express";
import {
   createAuthorsLoader,
   createBooksLoader,
   createListingsLoader
} from "../utilities/authorsLoader";
import { createUserLoader } from "../utilities/userLoader";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { Redis } from "ioredis";

export interface MyContext {
   req: Request;
   res: Response;
   authorsLoader: ReturnType<typeof createAuthorsLoader>;
   booksLoader: ReturnType<typeof createBooksLoader>; ///</typeof>
   listingsLoader: ReturnType<typeof createListingsLoader>;
   usersLoader: ReturnType<typeof createUserLoader>;
   url: string;
   pubSub: RedisPubSub;
   redis: Redis;
}
