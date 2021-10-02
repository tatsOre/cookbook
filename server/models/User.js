const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const validator = require("validator");

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "User email is required"],
    unique: true,
    validate: [validator.isEmail, "Invalid email address"],
  },
  password: {
    type: String,
    minLength: [8, "Password must be at least 8 characters long"],
    required: [true, "User password is required"],
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
  photo: String,
});

UserSchema.pre("save", async function (next) {
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
