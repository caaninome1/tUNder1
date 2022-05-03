//Se importan cada una de las datasources
const ChatMs = require("./chatDataSource");
const ImageMS = require("./imageDataSource");
const ProfileMS = require("./profileDataSource");
const UserMS = require("./userDataSource");
//Se creal diccionario de datasources
const dataSources = () => ({
  chatMs: new ChatMs(),
  imageMS: new ImageMS(),
  profileMS: new ProfileMS(),
  userMS: new UserMS(),
});

module.exports = dataSources;
