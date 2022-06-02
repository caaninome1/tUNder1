const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const dataSources = require("./data_sources");
const { authentication } = require("./utilities/authentication");
require("dotenv").config();

const server = new ApolloServer({
  context: authentication,
  typeDefs,
  resolvers,
  dataSources: dataSources,
  introspection: true,
  playground: true,
});

server.listen(process.env.PORT || 4000, "0.0.0.0").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
