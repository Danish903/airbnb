import { mutationType } from "../../types/MutationTypes";

export interface NewMessagePayload {
   mutation: mutationType;
   id: string;
   text?: string;
   listingId: string;
   userId: string;
}
