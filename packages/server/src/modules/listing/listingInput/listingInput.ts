import { InputType, Field, Int, Float } from "type-graphql";

@InputType()
export class ListingInput {
   @Field()
   name: string;

   @Field()
   category: string;

   @Field({ nullable: true })
   pictureURL?: string;

   @Field()
   description: string;

   @Field(() => Int)
   price: number;

   @Field(() => Float)
   latitude: number;

   @Field(() => Float)
   longitude: number;

   @Field(() => Int)
   guests: number;

   @Field(() => Int)
   beds: number;

   @Field(() => [String])
   amenities: string[];
}
