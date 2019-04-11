import { Mutation, Resolver, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import { redis } from "../../redis";
import { User } from "../../entity/User";
import { sendEmail } from "../utils/sendEmail";
import {
   forgotPasswordConfirmationPrefix,
   emailConfirmationPrefix
} from "../constants/redisPrefixes";
import { ChangePasswordInput } from "./changePassowrd/changePasswordInput";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class ConfrimUserResolver {
   @Mutation(() => Boolean, { nullable: true })
   async confirmUser(@Arg("token") token: string): Promise<boolean> {
      const userId = await redis.get(emailConfirmationPrefix + token);
      if (!userId) return false;
      const user = await User.findOne(userId);
      if (!user) return false;
      user.confirmed = true;
      await user.save();
      await redis.del(emailConfirmationPrefix + token);

      return true;
   }

   @Mutation(() => User, { nullable: true })
   async changePassword(
      @Arg("data")
      { token, password }: ChangePasswordInput,
      @Ctx() ctx: MyContext
   ): Promise<User | null> {
      const userId = await redis.get(forgotPasswordConfirmationPrefix + token);
      if (!userId) return null;
      const user = await User.findOne(userId);
      if (!user) return null;
      await redis.del(forgotPasswordConfirmationPrefix + token);
      user.password = await bcrypt.hash(password, 12);
      await user.save();
      ctx.req.session!.userId = user.id;
      return user;
   }

   @Mutation(() => Boolean, { nullable: true })
   async forgotPassword(@Arg("email") email: string): Promise<boolean> {
      const user = await User.findOne({ where: { email } });
      if (!user) return false;
      const token = v4();
      await redis.set(
         forgotPasswordConfirmationPrefix + token,
         user.id,
         "ex",
         60 * 60 * 24
      ); // 1 day expiration
      const url = `http://localhost:3000/user/change-password/${token}`;
      await sendEmail(user.email, url);
      return true;
   }
   @Mutation(() => Boolean)
   async logout(@Ctx() ctx: MyContext): Promise<boolean> {
      return new Promise((resolve, reject) => {
         return ctx.req.session!.destroy(error => {
            if (error) {
               console.log(error);
               return reject(false);
            }
            ctx.res.clearCookie("qid");
            return resolve(true);
         });
      }); // = null;
   }
}
