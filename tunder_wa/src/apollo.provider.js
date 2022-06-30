import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  concat,
  ApolloLink,
} from "@apollo/client/core";

// Create the apollo client
export function createApolloClient(ssr = false) {
  // HTTP connection to the API
  const httpLink = createHttpLink({
    // You should use an absolute URL here
    //uri: "https://proxy-y6bebo7xta-uc.a.run.app",
    uri: "api-gateway",
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

  if (!ssr) {
    if (typeof window !== "undefined") {
      const state = window.__APOLLO_STATE__;
      if (state) {
        // If you have multiple clients, use `state.<client_id>`
        cache.restore(state.defaultClient);
      }
    }
  }

  // Create the apollo client
  const apolloClient = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache,
  });

  return apolloClient;
}
