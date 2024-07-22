const History = require("../../models/history");

const getUserHistory = async (req, res, next) => {
  try {
    console.log("ok");
    const history = await History.find({ user: req.user._id });

    return res.status(200).json({ history });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserHistory;
