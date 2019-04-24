import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import http from "http";
import { RedisPubSub } from "graphql-redis-subscriptions";
// import { redis } from "./redis";
import Redis from "ioredis";
import { createSchema } from "./utilities/createSchema";
import {
   createAuthorsLoader,
   createBooksLoader,
   createListingsLoader
} from "./utilities/authorsLoader";
import { createUserLoader } from "./utilities/userLoader";
import { Listing } from "./entity/Listing";

// import queryComplexity, {
//    fieldConfigEstimator,
//    simpleEstimator
// } from "graphql-query-complexity";
export const LISTING_CACHE_KEY = "LISTING_CACHE_KEY";
const REDIS_HOST = "127.0.0.1";
const REDIS_PORT = 6379;

const main = async () => {
   const options: Redis.RedisOptions = {
      host: REDIS_HOST,
      port: REDIS_PORT,
      retryStrategy: times => Math.max(times * 100, 3000)
   };

   const redis = new Redis(options);
   try {
      await createConnection();
   } catch (error) {
      console.log("PSQL connection failed");
   }
   // clear cache

   await redis.del(LISTING_CACHE_KEY);
   //fill
   const listings = await Listing.find();
   const listingStrings = listings.map(x => JSON.stringify(x));
   await redis.lpush(LISTING_CACHE_KEY, ...listingStrings);

   // console.log(await redis.lrange(LISTING_CACHE_KEY, 0, -1));

   // const schema = await buildSchema({
   //    resolvers: [__dirname + "/modules/**/*.ts"],
   //    authChecker: ({ context: { req } }) =>
   //       // here you can read user from context
   //       // and check his permission in db against `roles` argument
   //       // that comes from `@Authorized`, eg. ["ADMIN", "MODERATOR"]
   //       !req.session!.userId ? false : true // or false if access denied
   // });

   const schema = await createSchema();
   const pubSub = new RedisPubSub({
      publisher: new Redis(options),
      subscriber: new Redis(options)
   });

   const server = new ApolloServer({
      schema,
      context: ({ req, res }: any) => ({
         req,
         res,
         authorsLoader: createAuthorsLoader(),
         booksLoader: createBooksLoader(),
         listingsLoader: createListingsLoader(),
         usersLoader: createUserLoader(),
         url: req ? req.protocol + "://" + req.get("host") : "",
         pubSub,
         redis
      }),
      playground: true,
      subscriptions: {
         onConnect: () => console.log("Connected to websocket")
      },

      validationRules: [
         // queryComplexity({
         //    // The maximum allowed query complexity, queries above this threshold will be rejected
         //    maximumComplexity: 8,
         //    // The query variables. This is needed because the variables are not available
         //    // in the visitor of the graphql-js library
         //    variables: {},
         //    // Optional callback function to retrieve the determined query complexity
         //    // Will be invoked whether the query is rejected or not
         //    // This can be used for logging or to implement rate limiting
         //    onComplete: (complexity: number) => {
         //       console.log("Query Complexity:", complexity);
         //    },
         //    estimators: [
         //       // Using fieldConfigEstimator is mandatory to make it work with type-graphql
         //       fieldConfigEstimator(),
         //       // This will assign each field a complexity of 1 if no other estimator
         //       // returned a value. We can define the default value for fields not explicitly annotated
         //       simpleEstimator({
         //          defaultComplexity: 1
         //       })
         //    ]
         // }) as any
      ]
   });

   const app = express();

   app.use("/images", express.static("images"));

   const RedisStore = connectRedis(session);
   app.use(
      cors({
         credentials: true,
         origin: "http://localhost:3000"
      })
   );

   app.use(
      session({
         store: new RedisStore({
            client: new Redis(options) as any
         }),
         name: "qid",
         secret: `${process.env.REDIS_SECRET}`,
         resave: false,
         saveUninitialized: false,
         cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
         }
      })
   );

   server.applyMiddleware({ app, cors: false });

   const httpServer = http.createServer(app);
   server.installSubscriptionHandlers(httpServer);

   const PORT = process.env.PORT || 4000;
   httpServer.listen(PORT, () => {
      console.log(
         `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
      console.log(
         `🚀 Subscriptions ready at ws://localhost:${PORT}${
            server.subscriptionsPath
         }`
      );
   });
};
main();
