const mongoose = require("mongoose");

const { Schema } = mongoose;

const RecipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "A recipe title is required."],
      trim: true,
      maxLength: 100,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: "You must supply an author for the recipe",
    },
    description: String,
    photo: String,
    servings: {
      type: Number,
      min: [1, "Why no servings?"],
    },
    ingredients: [
      {
        unit: Number,
        fraction: String,
        measurement: String,
        name: String,
      },
    ],
    instructions: {
      type: Map,
      of: String,
    },
    categories: [String],
    cuisine: [String],
    public: {
      type: Boolean,
      default: false,
    },
    comments: String,
  },
  {
    timestamps: true,
  }
);

RecipeSchema.index({
  title: "text",
  categories: "text",
  cuisine: "text",
});

function findManyHook(next) {
  this.select("-ingredients -instructions -comments").populate({
    path: "author",
    select: "_id name",
  });
  next();
}

function findOneHook(next) {
  this.populate({ path: "author", select: "_id name" });
  next();
}

RecipeSchema.pre("find", findManyHook);
RecipeSchema.pre("findOne", findOneHook);

const RecipeModel = mongoose.model("Recipe", RecipeSchema);

module.exports = RecipeModel;
