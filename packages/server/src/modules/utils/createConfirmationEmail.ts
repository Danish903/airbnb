import { v4 } from "uuid";
import { redis } from "../../redis";
import { emailConfirmationPrefix } from "../constants/redisPrefixes";

export const createConfimationEmail = async (userId: string) => {
   const token = v4();

   await redis.set(emailConfirmationPrefix + token, userId, "ex", 60 * 60 * 24); // 1 day expiration
   return `http://localhost:3000/user/confirm/${token}`;
};
