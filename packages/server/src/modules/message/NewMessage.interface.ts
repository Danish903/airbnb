import { mutationType } from "../../types/MutationTypes";
import { Message } from "../../entity/Message";

export interface NewMessagePayload {
   mutation: mutationType;
   node: Message;
}
