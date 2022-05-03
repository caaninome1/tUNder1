//Se importan los typeDef de cada submodulo
const chatTypeDef = require("./chatTypeDefs");
const imageTypeDef = require("./imageTypeDefs");
const profileTypeDef = require("./profileTypeDefs");
const suggestionsTypeDef = require("./suggestionsTypeDefs");

//Se agregan los typeDefs importados para exportarlos
const schemasArrays = [
  chatTypeDef,
  imageTypeDef,
  profileTypeDef,
  suggestionsTypeDef,
  //Aca se van agregando los typeDef de otros microservicios
];

//Se exportan
module.exports = schemasArrays;
