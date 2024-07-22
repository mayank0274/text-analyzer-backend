const path = require("path");
const fs = require("fs");
const WordExtractor = require("word-extractor");

const readFile = async (file) => {
  const ext = path.extname(file.originalname);
  let content = "";

  switch (ext) {
    case ".html":
      content = file.buffer.toString("utf8");
      return content;
    case ".txt":
      content = file.buffer.toString("utf8");
      return content;
    case ".docx":
      const extractor = new WordExtractor();
      const extracted = await extractor.extract(file.buffer);
      return extracted.getBody();
    default:
      content = "Invalid file type";
      return content;
  }
};

module.exports = readFile;
