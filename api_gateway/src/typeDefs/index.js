//Se importan los typeDef de cada submodulo
const { interaction_ms_url } = require("../server");
const chatTypeDef = require("./chatTypeDefs");
const imageTypeDef = require("./imageTypeDefs");
const interactionTypeDef = require("./interactionTypeDefs");
const profileTypeDef = require("./profileTypeDefs");
const suggestionsTypeDef = require("./suggestionsTypeDefs");
const userTypeDef = require("./userTypeDefs");

//Se agregan los typeDefs importados para exportarlos
const schemasArrays = [
  chatTypeDef,
  imageTypeDef,
  profileTypeDef,
  suggestionsTypeDef,
  userTypeDef,
  interactionTypeDef,
  //Aca se van agregando los typeDef de otros microservicios
];

//Se exportan
module.exports = schemasArrays;
