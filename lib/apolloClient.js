import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://sonjacerovac.nenad-kozoder.rs/graphql", // Zameni sa svojim WP GraphQL endpointom
  cache: new InMemoryCache(),
});

export default client;