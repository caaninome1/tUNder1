const userResolver = {
  Query: {
    getUser: async (_, { id }, { dataSources }) => {
      return await dataSources.userMS.getUser(id);
    },
    getUsers: async (_, {}, { dataSources }) => {
      return await dataSources.userMS.getAllUsers();
    },
    validateToken: async (_, { token }, { dataSources }) => {
      return await dataSources.userMS.validateToken(token);
    },
  },
  Mutation: {
    saveUser: async (_, { newUser }, { dataSources }) => {
      return await dataSources.userMS.saveUser(newUser);
    },
    login: async (_, { user }, { dataSources }) => {
      return await dataSources.userMS.login(user);
    },
    refreshToken: async (_, { token }, { dataSources }) => {
      return await dataSources.userMS.refreshToken(token);
    },
  },
};

module.exports = userResolver;
