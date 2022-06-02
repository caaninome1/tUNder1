const { sendMessage } = require("../utilities/queueSender");
const { requireAuth } = require("../utilities/authentication");

const imageResolver = {
  Query: {
    getImage: async (_, { id }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.imageMS.getImage(id);
    },
    getImages: async (_, { user_id }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.imageMS.getImages(user_id);
    },
  },
  Mutation: {
    postImage: async (_, { newImage }, { dataSources, logged }) => {
      let newImageServer = JSON.parse(JSON.stringify(newImage));
      newImageServer.b64 = "";
      let id = await dataSources.imageMS.postImage(newImage);
      sendMessage({ id: id, b64: newImage.b64 });
      return id;
    },
    deleteImage: async (_, { id }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.imageMS.deleteImage(id);
    },
  },
};

module.exports = imageResolver;
