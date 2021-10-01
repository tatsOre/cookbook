const express = require("express");
const router = express.Router();

const recipeController = require("../controllers/recipeController");

const { catchErrors } = require("../lib/errorHandlers");

// GET request for list of all Recipe items.
router.get("/", recipeController.recipe_list);

// POST request for creating Recipe.
router.post("/create", catchErrors(recipeController.recipe_create));

// GET request for one Recipe.
router.get("/:id", recipeController.recipe_details);

// DELETE request to update Recipe.
router.put("/:id/update", catchErrors(recipeController.recipe_update));

// DELETE request to delete Recipe.
router.delete("/:id/delete", recipeController.recipe_delete);

module.exports = router;
