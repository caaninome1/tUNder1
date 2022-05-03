const { gql } = require("apollo-server");

const userTypeDef = gql`
  type User {
    id: Long!
    name: String!
    email: String
    password: String
  }
  input NewUser {
    id: Long!
    name: String!
    email: String
    password: String
  }
  type Query {
    getUser(id: Long!): User
    getUsers(): [User]
  }
  type Mutation {
    saveUser(newUser: NewUser!): User
  }
`;

module.exports = userTypeDef;
