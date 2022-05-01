const { gql } = require("apollo-server");

const profileTypeDef = gql`
  type Characteristic {
    type: String!
    content: String!
  }

  type NewProfile {
    identification: Int!
    name: String!
    age: String!
    occupation: String!
    gender: String!
    address: String!
    phone: String!
    characteristic: [Characteristic]
  }

  input ProfileInput {
    identification: Int!
    name: String!
    age: String!
    occupation: String!
    gender: String!
    address: String!
    phone: String!
    characteristic: [CharacteristicInput]
  }

  input CharacteristicInput {
    type: String!
    content: String!
  }

  type Query {
    getProfile(id: Int!): NewProfile
    getProfiles: [NewProfile]
  }

  type Mutation {
    postProfile(newProfile: ProfileInput!): NewProfile
    deleteProfile(id: Int!): Boolean
    updateProfile(profile: ProfileInput!): Boolean
  }
`;

module.exports = profileTypeDef;
