const chatResolver = {
  Query: {
    getChat: async (_, { idChat }, { dataSources }) => {
      return await dataSources.chatMs.getChat(idChat);
    },
    getChatMessage: async (_, { idChat, idMessage }, { dataSources }) => {
      return await dataSources.chatMs.getChatMessage(idChat, idMessage);
    },
    getUserChats: async (_, { idUser }, { dataSources }) => {
      return await dataSources.chatMs.getUserChats(idUser);
    },
    getChatMessages: async (_, { data }, { dataSources }) => {
      return await dataSources.chatMs.getChatMessages(data);
    },
  },
  Mutation: {
    createChat: async (_, { chat }, { dataSources }) => {
      return await dataSources.chatMs.createChat(chat);
    },
    createMessage: async (_, { idChat, message }, { dataSources }) => {
      return await dataSources.chatMs.createMessage(idChat, message);
    },
    emptyMessage: async (_, { idChat, idMessage }, { dataSources }) => {
      return await dataSources.chatMs.emptyMessage(idChat, idMessage);
    },
    deleteMessage: async (_, { idChat, idMessage }, { dataSources }) => {
      return await dataSources.chatMs.deleteMessage(idChat, idMessage);
    },
  },
};

module.exports = chatResolver;
