import faker from "faker";
import { testConn } from "../../../testUtils/testConn";

import { Connection } from "typeorm";

import { gCall } from "../../../testUtils/gCall";
import { User } from "../../../entity/User";

let conn: Connection;
beforeAll(async () => {
   conn = await testConn();
});

afterAll(async () => {
   await conn.close();
});

const registerMutation = `
mutation Register($data: RegisterInput!){
   register(
     data: $data
   ) {
     id
     firstName
     lastName
     email
     name
   }
 }
`;

describe("Register", () => {
   test("create user", async () => {
      const user = {
         firstName: faker.name.firstName(),
         lastName: faker.name.lastName(),
         email: faker.internet.email(),
         password: faker.internet.password()
      };
      const response = await gCall({
         source: registerMutation,
         variableValues: {
            data: user
         }
      });
      expect(response).toMatchObject({
         data: {
            register: {
               firstName: user.firstName,
               lastName: user.lastName,
               email: user.email
            }
         }
      });
      const dbUser = await User.findOne(response.data!.register.id);
      expect(dbUser!.firstName).toBe(user.firstName);
      expect(dbUser!.confirmed).toBeFalsy();
   });
});
