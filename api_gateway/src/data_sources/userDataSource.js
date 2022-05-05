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
    if (ans.status == 200) {
      return ans.user.id;
    }
    return null;
  }

  async getUser(id) {
    let ans = await this.get(`/user/${id}`);
    if (ans.status == 200) {
      return ans.user;
    }
    return null;
  }

  async getAllUsers() {
    let ans = await this.get("/user");
    if (ans.status == 200) {
      return ans.users;
    }
    return null;
  }
}

module.exports = UserMS;
