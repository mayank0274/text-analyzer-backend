const analyzeText = require("../../services/analyzeText");
const History = require("../../models/history");

const textAnalyzer = async (req, res, next) => {
  try {
    let { userPrompt } = req.body;

    if (!userPrompt) {
      return next(
        CustomErrorHandler.credentialsRequired("User prompt is required")
      );
    }

    const result = await analyzeText(userPrompt, next);

    // add to history
    const history = new History({
      user: req.user._id,
      analysis_result: JSON.stringify(result),
      text: userPrompt.slice(0, 200),
    });

    await history.save();

    res.status(200).send({ response: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = textAnalyzer;
