const jwt = require("jsonwebtoken");
const { jwtPrivateKey } = require("../startup/config");
const Response = require("../utils/Response");
module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];

  //Extracting token from authorization header
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .send(Response.failure(401, "Access denied no token provided"));
  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    console.log("Token decoded:", decoded);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).send(Response.failure(401, "Invalid code"));
  }
};
