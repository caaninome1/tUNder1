const { requireAuth } = require("../utilities/authentication");

const chatResolver = {
  Query: {
    getChat: async (_, { idChat }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.chatMs.getChat(idChat);
    },
    getChatMessage: async (
      _,
      { idChat, idMessage },
      { dataSources, logged }
    ) => {
      requireAuth(logged);
      return await dataSources.chatMs.getChatMessage(idChat, idMessage);
    },
    getUserChats: async (_, { idUser }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.chatMs.getUserChats(idUser);
    },
    getChatMessages: async (_, { data }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.chatMs.getChatMessages(data);
    },
  },
  Mutation: {
    createChat: async (_, { chat }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.chatMs.createChat(chat);
    },
    createMessage: async (_, { idChat, message }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.chatMs.createMessage(idChat, message);
    },
    emptyMessage: async (_, { idChat, idMessage }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.chatMs.emptyMessage(idChat, idMessage);
    },
    deleteMessage: async (
      _,
      { idChat, idMessage },
      { dataSources, logged }
    ) => {
      requireAuth(logged);
      return await dataSources.chatMs.deleteMessage(idChat, idMessage);
    },
  },
};

module.exports = chatResolver;
