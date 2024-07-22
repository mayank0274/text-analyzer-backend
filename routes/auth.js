const router = require("express").Router();
const loginController = require("../controllers/auth/loginController");
const logoutController = require("../controllers/auth/logoutController");
const getUserDetailsController = require("../controllers/auth/getUserDetailsController");
const registrationController = require("../controllers/auth/registerController");

// middleware
const verifyUser = require("../middlewares/verifyUser");

// auth
router.post("/login", loginController);
router.post("/register", registrationController);
router.get("/logout", verifyUser, logoutController);
router.get("/me", verifyUser, getUserDetailsController);

module.exports = router;
