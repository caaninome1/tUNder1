const { gql } = require("apollo-server");

const chatTypeDef = gql`
  type Message {
    id: String!
    user: String!
    date: String!
    content: String!
    status: String!
  }

  type Chat {
    id: String!
    user1: String!
    user2: String!
    messages: [Message]
  }

  input ChatInput {
    user1: String!
    user2: String!
  }

  type Query {
    getChat(idChat: String!): Chat
  }

  type Mutation {
    createChat(chat: ChatInput): String
  }
`;

module.exports = chatTypeDef;
