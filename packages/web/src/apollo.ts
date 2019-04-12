import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";

export const client = new ApolloClient({
   link: new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "inlcude"
   }),
   cache: new InMemoryCache()
});
