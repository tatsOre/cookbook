import { useContext, useState } from "react";
import Link from "next/link";
import { userContext } from "../../src/UserContext";

import ButtonFavorites from "../Buttons/ButtonFavorites";
import RecipeInstructions from "./RecipeInstructions";
import Tabs from "./Tabs";

import styles from "./RecipePost.module.css";

const RecipePost = ({ recipe }) => {
  const { user } = useContext(userContext);
  const userRecipes = user?.recipes || [];

  const [openTabs, setOpenTabs] = useState(false);

  const handleOpenTabs = () => setOpenTabs(true);

  const {
    _id,
    title,
    description,
    photo,
    categories,
    cuisine,
    servings,
    ingredients,
    instructions,
    author,
    comments,
  } = recipe;

  const addToShoppingList = 1;

  return (
    <>
      <article className={styles.recipe}>
        <h1 className={styles.recipe__title}>{title}</h1>
        <p className={styles.recipe__author}>
          <span>By </span>
          <Link href="/">
            <a>{author.name}</a>
          </Link>
        </p>
        {userRecipes.includes(_id) ? (
          <div>
            <button type="button" onClick={() => alert("Edit your recipe!")}>
              Edit
            </button>
            <button type="button" onClick={() => alert("Are you sure?")}>
              Delete
            </button>
          </div>
        ) : (
          <ButtonFavorites id={_id} />
        )}

        <div className={styles.recipe__image_container}>
          <img className={styles.recipe__image} src={photo} alt={title} />
        </div>

        <div className={styles.recipe__categories}>
          <p className={styles.TESTTWO}>Cuisine</p>
          <ul>
            {cuisine.map((item) => (
              <li key={item} className={styles.TEST}>
                {item}
              </li>
            ))}
          </ul>

          <p className={styles.TESTTWO}>Categories</p>
          <ul>
            {categories.map((item) => (
              <li key={item} className={styles.TEST}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.recipe__description}>{description}</p>

        <div className={styles.recipe__servings}>
          <label htmlFor="servings">Servings:</label>
          <input
            type="number"
            id="servings"
            name="servings"
            min="1"
            defaultValue={servings}
          />
          <button type="button">Adjust</button>
          <button type="button" onClick={handleOpenTabs}>
            Expand
          </button>
        </div>

        <div className={styles.article__ingredients_container}>
          <div className={styles.recipe__ingredients}>
            <h2 className={styles.recipe__subtitle}>Ingredients</h2>
            <ul>
              {ingredients.map((item) => (
                <li key={`ing-${item._id}`}>
                  <input type="checkbox" />
                  <label>
                    {item.metric_quantity} {item.unit} {item.name}
                  </label>
                </li>
              ))}
            </ul>
            <button>
              Add {addToShoppingList ? addToShoppingList : "ALL"} ingredient
              {addToShoppingList > 1 || addToShoppingList === 0 ? "s" : ""} to
              shopping list
            </button>
          </div>
          <div className={styles.recipe__instructions}>
            <h2 className={styles.recipe__subtitle}>Instructions</h2>
            <RecipeInstructions
              instructions={instructions}
              comments={comments}
            />
          </div>
        </div>
      </article>

      <Tabs
        open={openTabs}
        openTabs={setOpenTabs}
        ingredients={ingredients}
        instructions={
          <RecipeInstructions instructions={instructions} comments={comments} />
        }
      />
    </>
  );
};

export default RecipePost;
