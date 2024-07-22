const readFile = require("../../services/readFiles");
const CustomErrorHandler = require("../../services/customErrorHandler");
const analyzeText = require("../../services/analyzeText");
const History = require("../../models/history");

const analyzeTextFromFile = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return next(CustomErrorHandler.credentialsRequired("file is required"));
    }

    const content = await readFile(file);

    if (content === "Invalid file type") {
      return next(CustomErrorHandler.credentialsRequired("invalid file type"));
    }

    const result = await analyzeText(content.trim(), next);

    // add to history
    const history = new History({
      user: req.user._id,
      analysis_result: JSON.stringify(result),
      text: content.slice(0, 200),
    });

    await history.save();

    res.status(200).send({ response: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = analyzeTextFromFile;
