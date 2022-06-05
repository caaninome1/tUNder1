const { requireAuth } = require("../utilities/authentication");
const profileResolver = {
  Query: {
    getProfileSoap: async (_, { id }, { dataSources, logged }) => {
      return await dataSources.profileMS.getProfile(id);
    },
    getProfile: async (_, { id }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.profileMS.getProfile(id);
    },
    getProfiles: async (_, {}, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.profileMS.getProfiles();
    },
    getProfileG: async (_, { gender }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.profileMS.getProfileG(gender);
    },
    getProfileGenderCity: async (
      _,
      { profileGendercity },
      { dataSources, logged }
    ) => {
      requireAuth(logged);
      return await dataSources.profileMS.getProfileGenderCity(
        profileGendercity
      );
    },
  },
  Mutation: {
    postProfile: async (_, { newProfile }, { dataSources, logged }) => {
      return await dataSources.profileMS.postProfile(newProfile);
    },
    deleteProfile: async (_, { id }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.profileMS.deleteProfile(id);
    },
    updateProfile: async (_, { profile }, { dataSources, logged }) => {
      requireAuth(logged);
      return await dataSources.profileMS.updateProfile(profile);
    },
  },
};

module.exports = profileResolver;
