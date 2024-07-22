const { GoogleGenerativeAI } = require("@google/generative-ai");
const SYSTEM_PROMPT = require("../config/SystemPrompt");
const { GEMINI_API_KEY } = require("../config/envVariable");

const configuration = new GoogleGenerativeAI(GEMINI_API_KEY);
const modelId = "gemini-pro";
const model = configuration.getGenerativeModel({ model: modelId });

// convert result from ai to object
function convertResultToObj(result) {
  // result sections are separated by (given instruction to ai to do this) => ,@
  var properties = result.split(",@");
  var obj = {};
  properties.forEach(function (property) {
    var tup = property.split(":");
    obj[tup[0].trim()] = tup[1].trim();
  });
  return obj;
}

const analyzeText = async (userPrompt, next) => {
  try {
    let prompt = `${SYSTEM_PROMPT} ${userPrompt}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return convertResultToObj(text);
  } catch (error) {
    next(error);
  }
};

module.exports = analyzeText;
