const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/envVariable");

const jwtService = {
  sign(payload, expiry = "1h", secret = JWT_SECRET) {
    const token = jwt.sign(payload, secret);
    return token;
  },

  verify(payload, secret = JWT_SECRET) {
    return jwt.verify(payload, secret);
  },
};

module.exports = jwtService;
