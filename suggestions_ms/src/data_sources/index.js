//Se importan cada una de las datasources
const ChatMs = require("./chatDataSource");

//Se creal diccionario de datasources
const dataSources = () => ({
  chatMs: new ChatMs(),
});

module.exports = dataSources;
