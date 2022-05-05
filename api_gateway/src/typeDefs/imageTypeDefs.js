const { gql } = require("apollo-server");

const imageTypeDef = gql`
  type ExistingImage {
    id: String!
    b64: String!
    mime_type: String
    extension: String
  }
  input NewImage {
    user_id: String!
    mime_type: String
    extension: String
    b64: String
  }
  type Query {
    getImage(id: String!): ExistingImage
    getImages(user_id: String!): [ExistingImage]
  }
  type Mutation {
    postImage(newImage: NewImage!): String
    deleteImage(id: String!): String
  }
`;

module.exports = imageTypeDef;
