const mongoose = require("mongoose");

const { Schema } = mongoose;

const ShoppingListSchema = new Schema({
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
    required: "You must supply an recipe ID",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "You must supply an author for the shopping list",
  },
  items: [
    {
      name: String,
      unit: String,
      metric_quantity: Number,
      metric_display_quantify: String,
      metric_unit: String,
    },
  ],
});

function autopopulate(next) {
  this.populate({ path: "recipe", select: "_id title" });
  next();
}

ShoppingListSchema.pre("find", autopopulate);
ShoppingListSchema.pre("findOne", autopopulate);

const ShoppingListModel = mongoose.model("ShoppingList", ShoppingListSchema);

module.exports = ShoppingListModel;
