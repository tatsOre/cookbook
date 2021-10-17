import { useState, useContext } from "react";
import Link from "next/link";
import { userContext } from "../../src/UserContext";
import RecipeInstructions from "./RecipeInstructions";
import RecipeIngredients from "./RecipeIngredients";
import Tabs from "./Tabs";
import UserActions from "../User/UserActions";
import styles from "./RecipePost.module.css";
import { ButtonOutlined } from "../Buttons/Buttons";

const RecipePost = ({ recipe }) => {
  const { user } = useContext(userContext);
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
    public: isPublic,
  } = recipe;

  return (
    <>
      <article className={styles.recipe}>
        <div className={styles.recipe__header}>
          <h1 className={styles.recipe__title}>{title}</h1>
          {!user?.recipes.includes(_id) && (
            <p className={styles.recipe__author}>
              <span>By </span>
              <Link href="/">
                <a>{author?.name}</a>
              </Link>
            </p>
          )}

          <UserActions recipeID={_id} isPublic={isPublic} />
        </div>
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
          <ButtonOutlined type="button">Adjust</ButtonOutlined>
          <button type="button" onClick={handleOpenTabs}>
            Expand
          </button>
        </div>

        <div className={styles.article__ingredients_container}>
          <div className={styles.recipe__ingredients}>
            <h2 className={styles.recipe__subtitle}>Ingredients</h2>
            <RecipeIngredients ingredients={ingredients} recipe={_id} />
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
