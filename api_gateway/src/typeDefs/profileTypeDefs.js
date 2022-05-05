const { gql } = require("apollo-server");

const profileTypeDef = gql`
  type Characteristic {
    type: String!
    content: String!
  }

  type NewProfile {
    identification: Int!
    name: String!
    age: Int!
    occupation: String!
    gender: String!
    city: String!
    phone: String!
    campus: String!
    faculty: String!
    academicProgram: String!
    genderInterest: String!
    characteristic: [Characteristic]
  }

  input ProfileInput {
    identification: Int!
    name: String!
    age: Int!
    occupation: String!
    gender: String!
    city: String!
    phone: String!
    campus: String!
    faculty: String!
    academicProgram: String!
    genderInterest: String!
    characteristic: [CharacteristicInput]
  }

  input ProfileGenderCityInput{
    Gender:String!
    City: String!
  }

  input CharacteristicInput {
    type: String!
    content: String!
  }

  type Query {
    getProfile(id: Int!): NewProfile
    getProfiles: [NewProfile]
    getProfileG(gender: String!):[NewProfile]
    getProfileGenderCity(profileGendercity: ProfileGenderCityInput!): [NewProfile]
  }

  type Mutation {
    postProfile(newProfile: ProfileInput!): NewProfile
    deleteProfile(id: Int!): String!
    updateProfile(profile: ProfileInput!): NewProfile
  }
`;

module.exports = profileTypeDef;
