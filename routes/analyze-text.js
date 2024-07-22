const router = require("express").Router();
const textAnalyzer = require("../controllers/text-analyze/textAnalyzer");
const analyzeTextFromFile = require("../controllers/text-analyze/analyzeTextFromFile");
const getUserHistory = require("../controllers/text-analyze/getUserHistory");

// middleware
const verifyUser = require("../middlewares/verifyUser");

// multer config
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage }).single("file");

router.post("/analyze", verifyUser, textAnalyzer);
router.post("/upload", verifyUser, upload, analyzeTextFromFile);
router.get("/history", verifyUser, getUserHistory);

module.exports = router;
