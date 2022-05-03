const lodash = require("lodash");

//Se importan los resolvers de cada microservicio
const chatResolver = require("./chatResolver");
const imageResolver = require("./imageResolver");
const suggestionsResolver = require("./suggestionsResolver");
const userResolver = require("./userResolver");

//Se agregan los resolver importados para exportarlos
const resolvers = lodash.merge(
  chatResolver,
  imageResolver,
  suggestionsResolver,
  userResolver
  //Aca se van agregando los resolvers de otros microservicios
);

module.exports = resolvers;
