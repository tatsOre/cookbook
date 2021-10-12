const mongoose = require("mongoose");

const UserModel = mongoose.model("User");
const ShoppingListModel = mongoose.model("ShoppingList");

/**
 * GET /api/v1/me/shopping_lists
 * Retrive full user profile information.
 */
exports.getShopLists = async (req, res) => {
  const shopLists = await UserModel.findById({ _id: req.user._id })
    .select("shopping_lists")
    .populate({
      path: "shopping_lists",
      populate: {
        path: "recipe",
        select:
          "-categories -cuisine -author -servings -photo -description -createdAt -updatedAt",
      },
      options: { sort: { createdAt: -1 } },
    });

  return res.json(shopLists);
};

/**
 * POST /api/v1/me/shopping_lists
 * Add shopping list item
 */
exports.addOneShoppingList = async (req, res) => {
  req.body.author = req.user._id;
  const shopList = await ShoppingListModel.create({ ...req.body });

  await UserModel.findByIdAndUpdate(req.user._id, {
    $addToSet: { shopping_lists: shopList._id },
  });

  res.json(shopList);
};

/**
 * PATCH /api/v1/me/shopping_lists/:id
 * Update a shopping list item
 */
exports.updateOneShoppingList = async (req, res) => {
  const shopList = await ShoppingListModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );

  if (!shopList) throw NotFoundError("Document not found");
  res.json(shopList);
};

/**
 * DELETE /api/v1/me/shopping_lists/:id
 * Delete a shopping list item
 */
exports.deleteOneShoppingList = async (req, res) => {
  const { id } = req.params;

  await UserModel.findByIdAndUpdate(req.user._id, {
    $pull: { shopping_lists: id },
  });
  await ShoppingListModel.findByIdAndDelete({ _id: id });

  res.status(204).send();
};
