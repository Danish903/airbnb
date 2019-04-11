import {
   Resolver,
   Mutation,
   Arg,
   ClassType,
   UseMiddleware
} from "type-graphql";
// import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";

function createResolver<T extends ClassType, X extends ClassType>(
   suffix: string,
   returnType: T,
   inputType: X,
   entity: any,
   middleware?: Middleware<any>[]
) {
   @Resolver()
   class BaseResolver {
      @Mutation(() => returnType, { name: `create${suffix}` })
      @UseMiddleware(...(middleware || []))
      async create(@Arg("data", () => inputType) data: any) {
         return entity.create(data).save();
      }
   }
   return BaseResolver;
}

export const createUserRsolver = createResolver(
   "User",
   User,
   RegisterInput,
   User
);
export { createResolver as default };
