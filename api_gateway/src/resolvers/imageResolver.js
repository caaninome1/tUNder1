const imageResolver = {
  Query: {
    getImage: async (_, { id }, { dataSources }) => {
      return await dataSources.imageMS.getImage(id);
    },
  },
  Query: {
    getImages: async (_, { user_id }, { dataSources }) => {
      return await dataSources.imageMS.getImages(user_id);
    },
  },
  Mutation: {
    postImage: async (_, { newImage }, { dataSources }) => {
      return await dataSources.imageMS.postImage(newImage);
    },
  },
  Mutation: {
    deleteImage: async (_, { id }, { dataSources }) => {
      return await dataSources.imageMS.deleteImage(id);
    },
  },
};

module.exports = imageResolver;
