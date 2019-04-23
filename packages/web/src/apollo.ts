import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { split } from "apollo-link";
// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: createUploadLink()
// })

const httpLink = createUploadLink({
   uri: "http://localhost:4000/graphql",
   credentials: "include"
});

const wsLink = new WebSocketLink({
   uri: `ws://localhost:4000/graphql`,
   options: {
      reconnect: true
   }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
   // split based on operation type
   ({ query }) => {
      const { kind, operation } = getMainDefinition(query) as any;
      return kind === "OperationDefinition" && operation === "subscription";
   },
   wsLink,
   httpLink
);

export const client = new ApolloClient({
   link,
   cache: new InMemoryCache()
});
