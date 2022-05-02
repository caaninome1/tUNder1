//Se importan los typeDef de cada submodulo
const chatTypeDef = require("./chatTypeDefs");
const imageTypeDef = require("./imageTypeDefs");
const suggestionsTypeDef = require("./suggestionsTypeDefs");

//Se agregan los typeDefs importados para exportarlos
const schemasArrays = [
  chatTypeDef,
  imageTypeDef,
  suggestionsTypeDef,
  //Aca se van agregando los typeDef de otros microservicios
];

//Se exportan
module.exports = schemasArrays;
