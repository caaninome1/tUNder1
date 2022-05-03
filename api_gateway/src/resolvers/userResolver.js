const userResolver = {
    Query: {
      getUser: async (_, { id }, { dataSources }) => {
        return await dataSources.userMS.getUser(id);
      },
      getUsers: async (_, { }, { dataSources }) => { //empty?
        return await dataSources.userMS.getUsers();
      },
    },
    Mutation: {
      postUser: async (_, { newUser }, { dataSources }) => {
        return await dataSources.userMS.saveUser(newUser);
      },
    },
  };
  
  module.exports = userResolver;
  