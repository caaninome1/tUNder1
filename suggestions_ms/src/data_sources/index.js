const ChatMs = require("./chatDataSource");

const dataSources = () => ({
  chatMs: new ChatMs(),
});

module.exports = dataSources;
