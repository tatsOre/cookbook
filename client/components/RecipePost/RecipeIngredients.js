import { useState } from "react";

const RecipeIngredients = ({ ingredients }) => {
  const recipeIngr = ingredients.map((ing) => ({ ...ing, checked: true }));
  const [checkedIngr, setCheckedIngr] = useState(recipeIngr);
  const addToShopList = checkedIngr.filter((ingr) => !ingr.checked);
  const count = addToShopList.length;

  const handleInputChange = ({ target }) => {
    const { value } = target;
    const updated = checkedIngr.map((item, index) => {
      if (value == index) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setCheckedIngr(updated);
  };

  const handleAddToShopList = () => {
    console.log(addToShopList);
  };

  return (
    <form>
      <ul>
        {ingredients.map((item, index) => (
          <li key={`ing-${item._id}`}>
            <input
              id={`ing-${item._id}`}
              type="checkbox"
              value={index}
              onChange={handleInputChange}
            />
            <label htmlFor={`ing-${item._id}`}>
              {item.metric_quantity} {item.unit} {item.name}
            </label>
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleAddToShopList}>
        Add {count ? count : "ALL"} ingredient
        {count > 1 || count === 0 ? "s" : ""} to shopping list
      </button>
    </form>
  );
};

export default RecipeIngredients;
