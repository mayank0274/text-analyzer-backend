const CustomErrorHandler = require("../services/customErrorHandler");
const jwtService = require("../services/jwtservice");

const verifyUser = async (req, res, next) => {
  // console.log(req.headers);
  const access_token = req.headers.authorization;

  if (!access_token) {
    return next(CustomErrorHandler.accessDenied("Access denied"));
  }

  try {
    const verifyJWT = await jwtService.verify(access_token.split(" ")[1]);

    if (!verifyJWT.isVerified) {
      return next(CustomErrorHandler.accessDenied("User not verified"));
    }

    const user = {
      _id: verifyJWT.id,
    };
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyUser;
