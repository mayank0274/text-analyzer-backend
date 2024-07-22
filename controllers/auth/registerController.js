const User = require("../../models/user");
const Joi = require("joi");
const CustomErrorHandler = require("../../services/customErrorHandler");
const bcrypt = require("bcryptjs");

const registrationController = async (req, res, next) => {
  // credentials validation
  const validationSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
  });

  try {
    const { error } = await validationSchema.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    next(err);
  }

  // checking if user already exists or not
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // if user already exist
    if (user) {
      return next(
        CustomErrorHandler.credentialsAlreadyTaken("Email already taken")
      );
    }

    // register user if not exist
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userDetails = await new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      profilePic: "",
      isVerified: true,
    });

    const saveUser = await userDetails.save();

    return res.status(200).json({
      message: "Registration success ",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = registrationController;
