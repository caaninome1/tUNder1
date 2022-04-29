const chatResolver = {
  Query: {
    getChat: async (_, { idChat }, { dataSources }) => {
      return await dataSources.chatMs.getChat(idChat);
    },
  },
  Mutation: {
    createChat: async (_, { chat }, { dataSources }) => {
      return await dataSources.chatMs.createChat(chat);
    },
  },
};

module.exports = chatResolver;
