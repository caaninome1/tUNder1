const { gql } = require("apollo-server");

const userTypeDef = gql`
  type User {
    id: Int!
    name: String!
    email: String
    password: String
  }

  input NewUser {
    id: Int!
    name: String!
    email: String
    password: String
  }

  type Query {
    getUser(id: Int!): User
    getUsers: [User]
  }

  type Mutation {
    saveUser(newUser: NewUser!): User
  }
`;

module.exports = userTypeDef;
