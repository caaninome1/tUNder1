const { gql } = require("apollo-server");

const suggestionsTypeDef = gql`
  type Suggestions {
    user: [String]!
  }

  type Query {
    lookForSuggestions(idUser: String): [Suggestions]
  }

  type Mutation {
  }
`;

module.exports = suggestionsTypeDef;
