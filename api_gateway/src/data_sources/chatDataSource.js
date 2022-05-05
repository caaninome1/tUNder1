const { RESTDataSource } = require("apollo-datasource-rest");
//Se importan las urls definidas en el archivo server.js
const urls = require("../server");

class ChatMs extends RESTDataSource {
  constructor() {
    super();
    //Se asigna la url del microservicio
    this.baseURL = urls.chat_ms_url;
  }

  async getChat(idChat) {
    let ans = await this.get(`/chat/${idChat}`);
    if (ans.status == 200) {
      return ans.data.data;
    }
    return null;
  }

  async getChatMessage(idChat, idMessage) {
    let ans = await this.get(`/message/${idChat}/${idMessage}`);
    if (ans.status == 200) {
      return ans.data.data;
    }
    return null;
  }

  async getUserChats(idUser) {
    let ans = await this.get(`/chats/${idUser}`);
    if (ans.status == 200) {
      return ans.data;
    }
    return null;
  }

  async getChatMessages(data) {
    data = new Object(JSON.parse(JSON.stringify(data)));
    let ans = await this.post(`/messages`, data);
    if (ans.status == 200) {
      return ans.data.data;
    }
    return null;
  }

  async createChat(chat) {
    chat = new Object(JSON.parse(JSON.stringify(chat)));
    let ans = await this.post(`/chat`, chat);
    if (ans.status == 200) {
      return ans.data.data.InsertedID;
    }
    return null;
  }

  async createMessage(idChat, message) {
    message = new Object(JSON.parse(JSON.stringify(message)));
    let ans = await this.post(`/message/${idChat}`, message);
    if (ans.status == 200) {
      return ans.data.insertedID;
    }
    return null;
  }

  async emptyMessage(idChat, idMessage) {
    let ans = await this.put(`/message/empty/${idChat}/${idMessage}`);
    if (ans.status == 200) {
      return ans.data.data.MatchedCount > 0;
    }
    return null;
  }

  async deleteMessage(idChat, idMessage) {
    let ans = await this.delete(`/message/delete/${idChat}/${idMessage}`);
    if (ans.status == 200) {
      return ans.data.data.MatchedCount > 0;
    }
    return null;
  }
}

module.exports = ChatMs;
