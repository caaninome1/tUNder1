//Se importan cada una de las datasources
const ChatMs = require("./chatDataSource");
const ImageMS = require("./imageDataSource");

//Se creal diccionario de datasources
const dataSources = () => ({
  chatMs: new ChatMs(),
  imageMS: new ImageMS(),
});

module.exports = dataSources;
