import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";
@Resolver()
class LoginResolver {
   @Mutation(() => User, { nullable: true })
   async login(
      @Arg("email") email: string,
      @Arg("password") password: string,
      @Ctx() ctx: MyContext
   ): Promise<User | null> {
      const user = await User.findOne({ where: { email } });

      if (!user) throw new Error("User doesn't exists");

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) throw new Error("Invalid Login");
      // if (!user.confirmed) return null;

      ctx.req.session!.userId = user.id;

      return user;
   }
}

export { LoginResolver as default };
