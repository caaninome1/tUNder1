const { gql } = require("apollo-server");

const interactionTypeDef = gql`
  type Like {
    id: Int!
    user_id: String!
    liked_user_id: String!
    like_status: Boolean!
    created_at: String
    updated_at: String
  }

  type Match {
    id: Int!
    user_id: String!
    liked_user_id: String!
    date: String
    created_at: String
    updated_at: String
  }

  input LikeInput {
    user_id: String!
    liked_user_id: String!
    like_status: Boolean!
  }

  type Query {
    getAllLikes: [Like]
    getUserLikes(user_id: String!): [Like]
    getUserMatches(user_id: String!): [Match]
    getUserLikedLikes(user_id: String!): [Like]
    getLike(id: Int!): Like
  }

  type Mutation {
    createLike(like: LikeInput!): Like
    deleteMatch(id: Int!): Match
  }
`;

module.exports = interactionTypeDef;
