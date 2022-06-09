import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  concat,
  ApolloLink,
} from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "https://proxy-y6bebo7xta-uc.a.run.app",
});

//Token
const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");
  if (token != null && token !== "") {
    operation.setContext({
      headers: {
        authorization: `${token}`,
      },
    });
  }
  return forward(operation);
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
});

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});
