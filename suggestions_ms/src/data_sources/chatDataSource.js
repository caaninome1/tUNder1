const { RESTDataSource } = require("apollo-datasource-rest");
const urls = require("../server");

class ChatMs extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = urls.chat_ms_url;
  }

  async createChat(chat) {
    chat = new Object(JSON.parse(JSON.stringify(chat)));
    let ans = await this.post(`/chat`, chat);
    console.log(ans);
    if (ans.status == 200) {
      return ans.data.data.InsertedID;
    }
    return null;
  }

  async getChat(idChat) {
    let ans = await this.get(`/chat/${idChat}`);
    if (ans.status == 200) {
      return ans.data.data;
    }
    return null;
  }
}

module.exports = ChatMs;
