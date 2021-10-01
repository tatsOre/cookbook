const createError = require("http-errors");
const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");

// Register the models Schema
require("./models/Recipe");
require("./models/User");

require("dotenv").config({ path: "variables.env" });

const app = express();

const PORT = process.env.PORT || 3000;
const DATABASE = process.env.DATABASE;

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (error) => console.log(error));
mongoose.connection.on("connected", () =>
  console.log("Connected to the database")
);
mongoose.Promise = global.Promise;

// Passport SignUp, Login, JWT Strategies
require("./auth/jwt_auth");

const indexRouter = require("./routes/index");
accountRouter = require("./routes/account");
const usersRouter = require("./routes/users");
const recipesRouter = require("./routes/recipes");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// App Custom Routes
app.use("/", indexRouter);
app.use("/account", accountRouter);
app.use("/api/v1/recipes?", recipesRouter); // decide this
app.use("/api/v1/users?", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Handle errors.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${server.address().port}`);
});
