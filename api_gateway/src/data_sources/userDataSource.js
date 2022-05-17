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

  async login(user) {
    user = new Object(JSON.parse(JSON.stringify(user)));
    let ans = await this.post("/login", user);
    return ans;
  }

  async validateToken(token) {
    let ans = await this.get(`/login/token/${token}`);
    return ans;
  }

  async refreshToken(token) {
    let ans = await this.get(`/login/refresh/${token}`);
    return ans;
  }
}

module.exports = UserMS;
