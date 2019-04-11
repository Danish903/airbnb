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

const ME_QUERY = `
query {
   me {
     id
     firstName
     lastName
     email
     name
   }
 }
`;

describe("ME", () => {
   test("Me Query", async () => {
      const fakeUser = {
         firstName: faker.name.firstName(),
         lastName: faker.name.lastName(),
         email: faker.internet.email(),
         password: faker.internet.password()
      };
      const user = await User.create(fakeUser).save();

      const response = await gCall({
         source: ME_QUERY,
         userId: user.id
      });

      expect(response.data!.me.firstName).toBe(fakeUser.firstName);
      // console.log(response);
   });
   test("return null", async () => {
      const response = await gCall({
         source: ME_QUERY
      });

      expect(response.data!.me).toBe(null);
   });
});
