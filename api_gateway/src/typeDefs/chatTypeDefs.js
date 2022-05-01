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

  type UserChats {
    chats: [String]
  }

  input ChatInput {
    user1: String!
    user2: String!
  }

  input MessageInput {
    user: String!
    content: String!
    status: String
  }

  input ChatMessageInput {
    id: String!
    initDate: String
    endDate: String
  }

  type Query {
    getChat(idChat: String!): Chat
    getChatMessage(idChat: String!, idMessage: String): Message
    getUserChats(idUser: String!): UserChats
    getChatMessages(data: ChatMessageInput!): [Message]
  }

  type Mutation {
    createChat(chat: ChatInput): String
    createMessage(idChat: String!, message: MessageInput): String
    emptyMessage(idChat: String!, idMessage: String!): Boolean
    deleteMessage(idChat: String!, idMessage: String!): Boolean
  }
`;

module.exports = chatTypeDef;
