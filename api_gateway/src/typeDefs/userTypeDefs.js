const { gql } = require("apollo-server");

const userTypeDef = gql`
  type User {
    id: Int!
    name: String!
    email: String
    password: String
  }

  input NewUser {
    id: Int
    name: String
    email: String!
    password: String!
  }

  type Token {
    userID: Int!
    token: String!
    creationDate: String!
    duration: Int!
  }

  type Query {
    getUser(id: Int!): User
    getUsers: [User]
    validateToken(token: String!): Boolean
  }

  type Mutation {
    login(user: NewUser): Token
    saveUser(newUser: NewUser!): User
    refreshToken(token: String!): Token
  }
`;

module.exports = userTypeDef;
