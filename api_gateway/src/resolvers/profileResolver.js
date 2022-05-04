const profileResolver = {
    Query: {
      getProfile: async (_, { id }, { dataSources }) => {
        return await dataSources.profileMS.getProfile(id);
      },
      getProfiles: async (_ , {}, { dataSources }) => {
        return await dataSources.profileMS.getProfiles();
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
  