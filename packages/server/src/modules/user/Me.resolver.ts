import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";

@Resolver(User)
class MeResolver {
   @Query(() => User, { nullable: true })
   async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
      // console.log("UserId: ", !ctx.req.session!.userId);
      if (!ctx.req.session!.userId) {
         return undefined;
      }
      return User.findOne({ where: { id: ctx.req.session!.userId } });
   }
}

export { MeResolver as default };
