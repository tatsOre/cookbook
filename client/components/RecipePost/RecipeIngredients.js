import { useState } from "react";
import AlertMessage from "../Alert/AlertMessage";

import { postData } from "../../src/ApiCalls";
import { SHOP_LIST_BASE_URL } from "../../config";

const RecipeIngredients = ({ ingredients, recipe }) => {
  const recipeIngrsInitial = ingredients.map((ingr) => ({
    ...ingr,
    checked: true,
  }));
  const [checkedIngr, setCheckedIngr] = useState(recipeIngrsInitial);
  const [alertMessage, setAlertMessage] = useState(true);

  const addToShopList = checkedIngr.filter((ingr) => !ingr.checked);
  const count = addToShopList.length;

  const handleInputChange = ({ target }) => {
    const { value } = target;

    setAlertMessage(false);

    const updated = checkedIngr.map((ingr, index) => {
      if (value == index) {
        return { ...ingr, checked: !ingr.checked };
      }
      return ingr;
    });

    setCheckedIngr(updated);
  };

  const handleAddToShopList = async (event) => {
    event.preventDefault();
    const items = addToShopList.map(
      ({ unit, fraction, measurement, name }) =>
        `${unit} ${fraction} ${measurement} ${name}`
    );

    const response = await postData(SHOP_LIST_BASE_URL, { recipe, items });

    if (response.status === 200) {
      setAlertMessage(true);
    }

    event.target.reset();
    setCheckedIngr(recipeIngrsInitial);
  };

  return (
    <form onSubmit={handleAddToShopList}>
      <ul>
        {ingredients.map((ingr, index) => (
          <li key={`ing-${ingr._id}`}>
            <input
              id={`ing-${ingr._id}`}
              type="checkbox"
              value={index}
              onChange={handleInputChange}
            />
            <label htmlFor={`ing-${ingr._id}`}>
              {ingr.unit} {ingr.fraction} {ingr.measurement} {ingr.name}
            </label>
          </li>
        ))}
      </ul>
      {alertMessage && (
        <AlertMessage variant="success" label={`Added to your shopping lists!`}>
          <a href="/">Go to my shopping lists.</a>
        </AlertMessage>
      )}
      <button type="submit">
        {`Add ${count ? count : "ALL"}
          ingredient${count > 1 || count === 0 ? "s" : ""} to shopping list`}
      </button>
    </form>
  );
};

export default RecipeIngredients;
