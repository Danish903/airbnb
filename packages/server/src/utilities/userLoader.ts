import DataLoader from "dataloader";
import { User } from "../entity/User";

type BatchUser = (ids: string[]) => Promise<User[]>;

const batchUsers: BatchUser = async (userIds: string[]) => {
   // console.log(userIds);
   const users = await User.findByIds(userIds);
   const userMap: { [key: string]: User } = {};
   users.forEach(u => {
      userMap[u.id] = u;
   });
   return userIds.map(id => userMap[id]);
};

export const createUserLoader = () => new DataLoader<string, User>(batchUsers);
