import { Resolver, Query, Arg } from "type-graphql";

import { Listing } from "../../entity/Listing";

@Resolver()
class GetListing {
   @Query(() => Listing, { nullable: true })
   async getListing(@Arg("listingId") listingId: string): Promise<Listing> {
      const listing = await Listing.findOne(listingId);
      if (!listing) throw new Error("Listing not found");
      return listing;
   }
}

export { GetListing };
