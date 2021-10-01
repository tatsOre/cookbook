const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const mongodbErrorHandler = require("mongoose-mongodb-errors");

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  facebook: {
    id: String,
    token: String,
    name: String,
    email: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

UserSchema.plugin(mongodbErrorHandler);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
