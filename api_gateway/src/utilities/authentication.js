const { AuthenticationError } = require("apollo-server");
const { user_ms_url } = require("../server");
const axios = require("axios");

const authentication = async ({ req }) => {
  const token = req.headers.authorization || "";
  if (token == "") return { logged: false };
  else {
    try {
      let response = await axios.get(`${user_ms_url}/login/token/${token}`);
      if (response.status != 200) {
        throw new AuthenticationError(`SESION INACTIVA - ${401}`);
      }
      console.log("answer: ", response.data);
      return { logged: response.data };
    } catch (error) {
      throw new AuthenticationError(`TOKEN ERROR: ${401}: ${error}`);
    }
  }
};

const requireAuth = (logged) => {
  if (!logged) {
    console.log("UNAUTHORIZED");
    throw new AuthenticationError(`SESION INACTIVA - ${401}`);
  }
};

module.exports = {
  authentication,
  requireAuth,
};
