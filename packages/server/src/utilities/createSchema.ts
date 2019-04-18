import { buildSchema } from "type-graphql";
// import { ConfrimUserResolver } from "../modules/user/ConfirmUser";
// import { CreateListingResovler } from "../modules/listing/ListingResolver";
// import { RegisterResolver } from "../modules/user/Register";
// import MeResolver from "../modules/user/Me";
// import LoginResolver from "../modules/user/Login";
export const createSchema = async () =>
   await buildSchema({
      resolvers: [__dirname + "/../modules/**/*.resolver.{ts,js}"],
      authChecker: ({ context: { req } }) =>
         // here you can read user from context
         // and check his permission in db against `roles` argument
         // that comes from `@Authorized`, eg. ["ADMIN", "MODERATOR"]
         !req.session!.userId ? false : true // or false if access denied
   });
