const { RESTDataSource } = require("apollo-datasource-rest");
//Se importan las urls definidas en el archivo server.js
const urls = require("../server");

class InteractionMs extends RESTDataSource {
  constructor() {
    super();
    //Se asigna la url del microservicio
    this.baseURL = urls.interaction_ms_url;
  }

  async getAllLikes() {
    return await this.get(`/likes`);
  }

  async getUserLikes(idUser) {
    return await this.get(`/likes/user/${idUser}`);
  }

  async getUserMatches(idUser) {
    return await this.get(`/users_matches/user/${idUser}`);
  }

  async getUserLikedLikes(idUser) {
    return await this.get(`/likes/user_liked/${idUser}`);
  }

  async getLike(id) {
    return await this.get(`/likes/${id}`);
  }

  async createLike(like) {
    like = new Object(JSON.parse(JSON.stringify(like)));
    console.log(like);
    return await this.post(`/likes`, like);
  }

  async deleteMatch(idMatch) {
    return await this.delete(`/users_matches/${idMatch}`);
  }
}

module.exports = InteractionMs;
