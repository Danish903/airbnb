import {
   BaseEntity,
   PrimaryGeneratedColumn,
   Entity,
   Column,
   ManyToOne
} from "typeorm";
import { ObjectType, Field, ID, Float, Int, Root } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity() // listings table name for the db
export class Listing extends BaseEntity {
   @Field(() => ID)
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Field()
   @Column("varchar", { length: 100 })
   name: string;

   @Field()
   @Column("varchar", { length: 100 })
   category: string;

   @Field()
   @Column("text")
   pictureURL: string;

   @Field()
   @Column("varchar", { length: 255 })
   description: string;

   @Field(() => Int)
   @Column("int")
   price: number;

   @Field(() => Float)
   @Column("double precision")
   latitude: number;

   @Field(() => Float)
   @Column("double precision")
   longitude: number;

   @Field(() => Int)
   @Column("int")
   guests: number;

   @Field(() => Int)
   @Column("int")
   beds: number;

   @Field(() => [String])
   @Column("text", { array: true })
   amenities: string[];
   // @Field(() => ID)
   @Column("uuid")
   userId: string;
   @ManyToOne(() => User, user => user.listings)
   user: User;

   @Field(() => User)
   async owner(@Root() parent: Listing): Promise<User> {
      const user = await User.findOne(parent.userId);
      return user!;
   }
}
