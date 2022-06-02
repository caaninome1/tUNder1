const { requireAuth } = require("../utilities/authentication");
const userResolver = {
  Query: {
    getUser: async (_, { id }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.userMS.getUser(id);
    },
    getUsers: async (_, {}, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.userMS.getAllUsers();
    },
    validateToken: async (_, { token }, { dataSources, logged }) => {
      return await dataSources.userMS.validateToken(token);
    },
  },
  Mutation: {
    saveUser: async (_, { newUser }, { dataSources, logged }) => {
      return await dataSources.userMS.saveUser(newUser);
    },
    login: async (_, { user }, { dataSources, logged }) => {
      return await dataSources.userMS.login(user);
    },
    refreshToken: async (_, { token }, { dataSources, logged }) => {
      return await dataSources.userMS.refreshToken(token);
    },
  },
};

module.exports = userResolver;
