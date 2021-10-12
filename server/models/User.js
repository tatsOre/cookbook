const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const md5 = require("md5");
const validator = require("validator");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email address is required"],
      unique: true,
      validate: [validator.isEmail, "Invalid email address"],
    },
    password: {
      type: String,
      minLength: [8, "Password must be at least 8 characters long"],
      select: false,
    },
    providers: {
      facebook: {
        id: String,
        email: String,
      },
      google: {
        id: String,
        email: String,
        photo: String,
      },
    },
    about: String,
    photo: String,
    recipes: [{ type: mongoose.Schema.ObjectId, ref: "Recipe" }],
    favorites: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    shopping_lists: [{ type: Schema.Types.ObjectId, ref: "ShoppingList" }],
    role: { type: String, enum: ["public", "user", "admin"] },
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual("gravatar").get(function () {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const compare = bcrypt.compare(password, this.password);
  return compare;
};

UserSchema.plugin(mongodbErrorHandler);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
