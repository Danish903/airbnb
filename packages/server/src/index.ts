import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

import { redis } from "./redis";
import { createSchema } from "./utilities/createSchema";
import {
   createAuthorsLoader,
   createBooksLoader,
   createListingsLoader
} from "./utilities/authorsLoader";
import { createUserLoader } from "./utilities/userLoader";

// import queryComplexity, {
//    fieldConfigEstimator,
//    simpleEstimator
// } from "graphql-query-complexity";

const main = async () => {
   try {
      await createConnection();
   } catch (error) {
      console.log("PSQL connection failed");
   }

   // const schema = await buildSchema({
   //    resolvers: [__dirname + "/modules/**/*.ts"],
   //    authChecker: ({ context: { req } }) =>
   //       // here you can read user from context
   //       // and check his permission in db against `roles` argument
   //       // that comes from `@Authorized`, eg. ["ADMIN", "MODERATOR"]
   //       !req.session!.userId ? false : true // or false if access denied
   // });

   const schema = await createSchema();

   const server = new ApolloServer({
      schema,
      context: ({ req, res }: any) => ({
         req,
         res,
         authorsLoader: createAuthorsLoader(),
         booksLoader: createBooksLoader(),
         listingsLoader: createListingsLoader(),
         usersLoader: createUserLoader(),
         url: req.protocol + "://" + req.get("host")
      }),

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
            client: redis as any
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

   app.listen({ port: process.env.PORT || 4000 }, () =>
      console.log(
         `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
   );
};
main();
