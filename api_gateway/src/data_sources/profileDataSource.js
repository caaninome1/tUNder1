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
    return ans;
  }

  async updateProfile( profile ) {
    profile = new Object(JSON.parse(JSON.stringify(profile)));
    let ans = await this.put(`/api/profile/${profile.id}`, profile );
    return ans ; 
  }

  async deleteProfile(id) {
    let ans = await this.delete(`/api/profile/${id}`);
    return ans ; 
  }

  async getProfile(id) {
    let ans = await this.get(`/api/profile/${id}`);
    if ( ans.identification == null ){
        return null ;
    }
    return ans;
  }

  async getProfiles() {
    let ans = await this.get('/api/profile');
    return ans;
  }

}

module.exports = ProfileMS;
