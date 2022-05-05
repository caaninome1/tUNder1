const profileResolver = {
    Query: {
      getProfile: async (_, { id }, { dataSources }) => {
        return await dataSources.profileMS.getProfile(id);
      },
      getProfiles: async (_ , {}, { dataSources }) => {
        return await dataSources.profileMS.getProfiles();
      },
      getProfileG: async (_, { gender }, { dataSources }) => {
        return await dataSources.profileMS.getProfileG(gender);
      },
      getProfileGenderCity: async (_, { profileGendercity }, { dataSources }) => {
        return await dataSources.profileMS.getProfileGenderCity(profileGendercity);
      },

    },
    Mutation: {
      postProfile: async (_, { newProfile }, { dataSources }) => {
        return await dataSources.profileMS.postProfile(newProfile);
      },
      deleteProfile: async (_, { id }, { dataSources }) => {
        return await dataSources.profileMS.deleteProfile(id);
      },
      updateProfile: async (_, { profile },  { dataSources }) => {
        return await dataSources.profileMS.updateProfile(profile);
      },
    },
  };
  
  module.exports = profileResolver ;
  