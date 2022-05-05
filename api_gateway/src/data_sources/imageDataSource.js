const { RESTDataSource } = require("apollo-datasource-rest");
const urls = require("../server");

class ImageMS extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = urls.images_ms_url;
  }

  async postImage(newImage) {
    newImage = new Object(JSON.parse(JSON.stringify(newImage)));
    let ans = await this.post('/image', newImage);
    if (ans.status == 200) {
      return ans.id;
    }
    return null;
  }

  async deleteImage(id) {
    let ans = await this.delete('/image', { id:id });
    if (ans.status == 200) {
      return ans.id;
    }
    return null;
  }

  async getImage(id) {
    let ans = await this.get('/image', { id:id });
    if (ans.status == 200) {
      return ans.image;
    }
    return null;
  }

  async getImages(user_id) {
    let ans = await this.get('/images', { user_id:user_id });
    if (ans.status == 200) {
      return ans.images;
    }
    return null;
  }

}

module.exports = ImageMS;
