const mongoose = require("mongoose");

const { Schema } = mongoose;

const ShoppingListSchema = new Schema(
  {
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
    items: [String],
  },
  {
    timestamps: true,
  }
);

const ShoppingListModel = mongoose.model("ShoppingList", ShoppingListSchema);

module.exports = ShoppingListModel;
