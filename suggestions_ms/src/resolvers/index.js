const lodash = require("lodash");

//Se importan los resolvers de cada microservicio
const chatResolver = require("./chatResolver");

//Se agregan los resolver importados para exportarlos
const resolvers = lodash.merge(
  chatResolver
  //Aca se van agregando los resolvers de otros microservicios
);

module.exports = resolvers;
