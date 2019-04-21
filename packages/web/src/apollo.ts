import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: createUploadLink()
// })
export const client = new ApolloClient({
   link: createUploadLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include"
   }),
   cache: new InMemoryCache()
});
