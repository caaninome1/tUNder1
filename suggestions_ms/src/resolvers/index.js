const lodash = require("lodash");

//Se importan los resolvers de cada submodulo
const chatResolver = require("./chatResolver");

//Se agregan los resolver importados para exportarlos
const resolvers = lodash.merge(chatResolver);

module.exports = resolvers;
