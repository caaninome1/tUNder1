const { gql } = require("apollo-server");

const imageTypeDef = gql
` type ExistingImage {
    id: String!
    b64: String!
    mime_type: String
    extension: String
  }
  input NewImage {
    user_id: String!
    b64: String!
    mime_type: String
    extension: String
  }
  type Query {
    getImage(id: String!): ExistingImage
  }
  type Query {
    getImages(user_id: String!): [ExistingImage]
  }
  type Mutation {
    postImage(newImage: NewImage!): String
  }
  type Mutation {
    deleteImage(id: String!): String
  }
`;

module.exports = imageTypeDef;