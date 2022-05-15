const { RESTDataSource } = require("apollo-datasource-rest");
const urls = require("../server");

class UserMS extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = urls.user_ms_url;
  }

  async saveUser(newUser) {
    newUser = new Object(JSON.parse(JSON.stringify(newUser)));
    let ans = await this.post("/user", newUser);
    return ans;
  }

  async getUser(id) {
    return await this.get(`/user/${id}`);
  }

  async getAllUsers() {
    return await this.get("/user");
  }
}

module.exports = UserMS;
