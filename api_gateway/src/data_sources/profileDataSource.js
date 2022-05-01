const { RESTDataSource } = require("apollo-datasource-rest");
const urls = require("../server");

class ProfileMS extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = urls.profile_ms_url;
  }

  async postProfile(newProfile) {
    newProfile = new Object(JSON.parse(JSON.stringify(newProfile)));
    let ans = await this.post('/api/profile', newProfile);
    if (ans.status == 201) {
      return ans;
    }
    return null;
  }

  async updateProfile( profile ) {
    profile = new Object(JSON.parse(JSON.stringify(profile)));
    let ans = await this.put(`/api/profile/${profile.id}`, profile );
    if (ans.status == 204) {
      return true;
    }
    return null;
  }

  async deleteProfile(id) {
    let ans = await this.delete(`/api/profile/${id}`);
    if (ans.status == 204) {
      return true;
    }
    return null;
  }

  async getProfile(id) {
    let ans = await this.get(`/api/profile/${id}`);
    if (ans.status == 200) {
      return ans;
    }
    return null;
  }

  async getProfiles() {
    let ans = await this.get('/api/profile');
    if (ans.status == 200) {
      return ans;
    }
    return null;
  }

}

module.exports = ProfileMS;
