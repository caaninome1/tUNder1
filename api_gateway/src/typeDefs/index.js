//Se importan los typeDef de cada submodulo
const chatTypeDef = require("./chatTypeDefs");
const imageTypeDef = require("./imageTypeDefs");
const profileTypeDef = require("./profileTypeDefs");

//Se agregan los typeDefs importados para exportarlos
const schemasArrays = [
  chatTypeDef,
  imageTypeDef,
  profileTypeDef,
  //Aca se van agregando los typeDef de otros microservicios
];

//Se exportan
module.exports = schemasArrays;
