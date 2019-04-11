import { buildSchema } from "type-graphql";

export const createSchema = async () =>
   await buildSchema({
      resolvers: [__dirname + "/../modules/*/*.ts"],
      authChecker: ({ context: { req } }) =>
         // here you can read user from context
         // and check his permission in db against `roles` argument
         // that comes from `@Authorized`, eg. ["ADMIN", "MODERATOR"]
         !req.session!.userId ? false : true // or false if access denied
   });
