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
    validate: [
      validator.isAlphanumeric,
      "Password must have at least one non-alpha character",
    ],
  },
  providers: {
    facebook: {
      id: String,
      email: String,
    },
    google: {
      id: String,
      email: String,
      displayName: String,
      photo: String,
    },
  },
  photo: String,
  role: { type: String, enum: ["public", "user", "admin"] },
});

UserSchema.pre("save", async function (next) {
  if (this.password) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const compare = bcrypt.compare(password, this.password);
  return compare;
};

UserSchema.plugin(mongodbErrorHandler);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
