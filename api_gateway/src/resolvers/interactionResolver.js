const { requireAuth } = require("../utilities/authentication");
const interactionResolver = {
  Query: {
    getAllLikes: async (_, {}, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.interactionMS.getAllLikes();
    },
    getUserLikes: async (_, { user_id }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.interactionMS.getUserLikes(user_id);
    },
    getUserMatches: async (_, { user_id }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.interactionMS.getUserMatches(user_id);
    },
    getUserLikedLikes: async (_, { user_id }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.interactionMS.getUserLikedLikes(user_id);
    },
    getLike: async (_, { id }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.interactionMS.getLike(id);
    },
  },
  Mutation: {
    createLike: async (_, { like }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.interactionMS.createLike(like);
    },
    deleteMatch: async (_, { id }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.interactionMS.deleteMatch(id);
    },
  },
};

module.exports = interactionResolver;
