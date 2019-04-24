import { Resolver, Query, Arg, InputType, Field, Int } from "type-graphql";

import { Listing } from "../../entity/Listing";
import { getConnection } from "typeorm";

@InputType()
export class ListingSearchInput {
   @Field({ nullable: true })
   name: string;

   @Field({ nullable: true })
   category: string;

   @Field({ nullable: true })
   pictureURL?: string;

   @Field({ nullable: true })
   description: string;

   @Field(() => Int, { nullable: true })
   price: number;

   @Field(() => Int, { nullable: true })
   guests: number;

   @Field(() => Int, { nullable: true })
   beds: number;
   @Field(() => Int, { nullable: true })
   offset: number;

   @Field(() => Int, { nullable: true })
   limit: number;
}

@Resolver()
class SearchListing {
   @Query(() => [Listing], { nullable: true })
   async searchListing(
      @Arg("input", { nullable: true }) input: ListingSearchInput
   ): Promise<Listing[]> {
      const { guests, beds, name, limit, offset } = input;

      let listingQB = await getConnection()
         .getRepository(Listing)
         .createQueryBuilder("l");

      // const where: any = {};
      if (guests) {
         listingQB.andWhere("l.guests = :guests", { guests });
      }
      if (beds) {
         listingQB.andWhere("l.beds = :beds", { beds });
      }
      if (name) {
         listingQB.andWhere("l.name ilike :name", { name: `%${name}%` });
      }
      // const listings = await Listing.find({ where });

      return await listingQB
         .take(limit)
         .skip(offset)
         .getMany();
   }
}

export { SearchListing };
