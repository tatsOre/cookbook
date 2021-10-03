const mongoose = require("mongoose");

module.exports = function () {
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
};
