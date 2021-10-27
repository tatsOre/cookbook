const router = require("express").Router();

const equivalences = [
  { fraction: "0", decimal: 0 },
  { fraction: "1/8", decimal: 0.125 },
  { fraction: "1/4", decimal: 0.25 },
  { fraction: "1/3", decimal: 0.33333333333333 },
  { fraction: "1/2", decimal: 0.5 },
  { fraction: "2/3", decimal: 0.66666666666667 },
  { fraction: "3/4", decimal: 0.75 },
];

/**
 * GET /assets/ingredients?field=[:field]
 * Retrieve FrontEnd assets for ingredients in the recipe factory
 */
router.get("/ingredients", (req, res) => {
  const { field } = req.query;
  const options = {
    fraction: ["0", "1/8", "1/4", "1/3", "1/2", "2/3", "3/4"],
    measurement: [
      "teaspoon",
      "tablespoon",
      "cup",
      "gallon",
      "gram",
      "pound",
      "kilogram",
      "ounce",
      "litre",
      "none",
    ],
  };
  if (!Object.keys(options).includes(field)) {
    return res.status(400).json("wrong request");
  }
  res.json(options[field]);
});

/**
 * GET /assets/ingredients?field=[:field]
 * Retrieve FrontEnd assets for ingredients in the recipe factory
 */
router.get("/recipes", (req, res) => {
  const { field } = req.query;
  const options = {
    cuisine: [
      "african",
      "asian",
      "caribbean",
      "chinese",
      "french",
      "greek",
      "indian",
      "italian",
      "japanese",
      "latin american",
      "mexican",
      "mediterranean",
      "US",
      "spanish",
      "thai",
      "vietnamese",
      "other",
    ],
    categories: [
      "breakfast",
      "lunch",
      "dinner",
      "appetizer",
      "soup",
      "salad",
      "dessert",
      "sauce",
      "drink",
      "vegetarian",
      "easy",
      "quick",
      "for two",
    ],
  };
  if (!Object.keys(options).includes(field)) {
    return res.status(400).json("wrong request");
  }
  res.json(options[field]);
});

module.exports = router;
