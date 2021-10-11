const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const passport = require("passport");

// Register the models Schema
require("./models/Recipe");
require("./models/User");
require("./models/ShoppingList");

require("dotenv").config({ path: "variables.env" });

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB
require("./config/db")();
// Passport strategies
require("./config/passport")();

const adminRouter = require("./routes/admin");
const assetRouter = require("./routes/assets");
const indexRouter = require("./routes/index");

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// App Custom Routes
app.use("/admin/", adminRouter);
app.use("/assets/", assetRouter);
app.use("/api/v1/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Handle errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: [err.message] });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${server.address().port}`);
});
