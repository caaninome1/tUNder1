const { ApolloError } = require("apollo-server");
const { user_ms_url } = require("../server");
const fetch = require("node-fetch");

const authentication = async ({ req }) => {
  const token = req.headers.authorization || "";
  if (token == "") return { userIdToken: null };
  else {
    try {
      let requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({ token }),
        redirect: "follow",
      };
      let response = await fetch(`${user_ms_url}/validarToken`, requestOptions);
      if (response.status != 200) {
        console.log(response);
        throw new ApolloError(
          `SESION INACTIVA - ${401}` + response.status,
          401
        );
      }
      return { userIdToken: (await response.json()).data };
    } catch (error) {
      throw new ApolloError(`TOKEN ERROR: ${500}: ${error}`, 500);
    }
  }
};

module.exports = authentication;
