const userResolver = {
  Query: {
    getUser: async (_, { id }, { dataSources }) => {
      return await dataSources.userMS.getUser(id);
    },
    getUsers: async (_, {}, { dataSources }) => {
      return await dataSources.userMS.getUsers();
    },
  },
  Mutation: {
    saveUser: async (_, { newUser }, { dataSources }) => {
      return await dataSources.userMS.saveUser(newUser);
    },
  },
};

module.exports = userResolver;
