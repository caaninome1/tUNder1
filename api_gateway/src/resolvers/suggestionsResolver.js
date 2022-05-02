const suggestionsResolver = {
  Query: {
    lookForSuggestions: async (_, { idUser }, { dataSources }) => {
      //Se buscan las interacciones ya realizadas por el usuario
      // let iteractions = await dataSources.iteractionsMS.getUserIteractions(
      //   idUser
      // );
      // //Se buscan los perfiles que coincidan con el usuario
      // return await dataSources.profileMS.getProfilesNotLike(
      //   idUser,
      //   iteractions
      // );
      return [];
    },
  },
  Mutation: {},
};

module.exports = suggestionsResolver;
