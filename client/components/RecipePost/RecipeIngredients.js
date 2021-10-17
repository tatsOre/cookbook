import { useState } from "react";
import AlertMessage from "../Alert/AlertMessage";
import { ButtonOutlined } from "../Buttons/Buttons";
import { postData } from "../../src/ApiCalls";
import { SHOP_LIST_BASE_URL } from "../../config";

const RecipeIngredients = ({ ingredients, recipe }) => {
  const recipeIngrsInitial = ingredients.map((ingr) => ({
    ...ingr,
    checked: false,
  }));
  const [ingrState, setIngrState] = useState(recipeIngrsInitial);
  const [alertMessage, setAlertMessage] = useState(false);

  const selected = ingrState.filter((ingr) => ingr.checked);
  const count = selected.length;

  const buttonLabel = `Add ${count ? count : "ALL"} ingredient${
    count > 1 || count === 0 ? "s" : ""
  } to shopping list`;

  const handleInputChange = ({ target }) => {
    const { value } = target;

    setAlertMessage(false);

    const updated = ingrState.map((ingr, index) => {
      if (value == index) {
        return { ...ingr, checked: !ingr.checked };
      }
      return ingr;
    });

    setIngrState(updated);
  };

  const handleAddToShopList = (event) => {
    setIngrState(recipeIngrsInitial);
    // Remove alert message if count === 0
    setAlertMessage(false);
    event.preventDefault();
    // count 0 === Add? = all ingrs to shop list:
    const addToShopList = count ? selected : ingredients;
    const items = addToShopList.map(
      ({ unit, fraction, measurement, name }) =>
        `${unit} ${fraction} ${measurement} ${name}`
    );

    postData(SHOP_LIST_BASE_URL, { recipe, items })
      .then((response) => {
        if (response.status === 200) {
          setAlertMessage(true);
        }
      }) // todo: handle errors in UI/UX
      .catch((error) => console.log({ error }));
  };

  return (
    <form onSubmit={handleAddToShopList}>
      <fieldset>
        {ingrState.map((ingr, index) => (
          <label key={`ingr-${index}`}>
            <input
              type="checkbox"
              value={index}
              onChange={handleInputChange}
              checked={!!ingr.checked}
              readOnly
            />
            {ingr.unit} {ingr.fraction} {ingr.measurement} {ingr.name}
          </label>
        ))}
      </fieldset>
      {alertMessage && (
        <AlertMessage variant="success" label={`Added to your shopping lists!`}>
          <a href="/">Go to my shopping lists.</a>
        </AlertMessage>
      )}
      <ButtonOutlined type="submit">{buttonLabel}</ButtonOutlined>
    </form>
  );
};

export default RecipeIngredients;
