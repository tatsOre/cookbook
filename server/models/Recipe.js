const mongoose = require("mongoose");

const { Schema } = mongoose;

const RecipeSchema = new Schema({
  title: {
    type: String,
    required: [true, "A recipe title is required."],
    trim: true,
    maxLength: 100,
  },
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "You must supply an author for the recipe",
  },
  description: String,
  photo_url: String,
  servings: {
    type: Number,
    min: [1, "Why no servings?"],
  },
  ingredients: [
    {
      name: String,
      unit: String,
      metric_quantity: Number,
      metric_display_quantify: String,
      metric_unit: String,
    },
  ],
  instructions: {
    type: Map,
    of: String,
  },
  category: [String],
  cuisine: [String],
  public: {
    type: Boolean,
    default: false,
  },
});

function autopopulate(next) {
  this.populate({ path: "author", select: "_id firstName lastName" });
  next();
}

RecipeSchema.pre("find", autopopulate);
RecipeSchema.pre("findOne", autopopulate);

const RecipeModel = mongoose.model("Recipe", RecipeSchema);

module.exports = RecipeModel;
