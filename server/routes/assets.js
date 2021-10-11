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
      "Teaspoon",
      "Tablespoon",
      "Cup",
      "Gallon",
      "Grams",
      "Kilograms",
      "Ounces",
      "Litres",
      "None",
    ],
  };
  if (!Object.keys(options).includes(field)) {
    return res.status(400).json("wrong request");
  }
  res.json(options[field]);
});

module.exports = router;
