require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;
const connectMongo = require("./db/connection");
const handleError = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const textAnalyzeRouter = require("./routes/analyze-text");

// middlewares
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: false,
  })
);

// connection to db
connectMongo();

// route
app.get("/test", (req, res) => {
  res.status(200).json({ success: "server running" });
});

app.use("/api/auth", authRouter);
app.use("/api/", textAnalyzeRouter);

// error handling
app.use(handleError);

// listen to server
app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
