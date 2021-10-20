import { useState, useContext } from "react";
import Link from "next/link";
import { userContext } from "../../src/UserContext";
import RecipeCategoriesLabels from "../RecipeAssets/RecipeCategories";
import RecipeImage from "../RecipeAssets/RecipeImage";
import Instructions from "./Instructions";
import Ingredients from "./Ingredients";
import Tabs from "./Tabs/FullViewTabs";
import UserActions from "../User/UserActions";
import styles from "./RecipePost.module.css";

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
          <h1 className={styles.recipe__title__responsive}>{title}</h1>
          <div className={styles.recipe__photo}>
            <RecipeImage photo={photo} title={title} />
          </div>

          <div>
            <h1 className={styles.recipe__title}>{title}</h1>
            <p className={styles.recipe__description}>
              <span className={styles.firstcharacter}>
                {description.charAt(0)}
              </span>
              {description.slice(1, -1)}
            </p>

            <div className={styles.recipe__details}>
              {categories.length ? (
                <div className={styles.recipe__categories}>
                  <RecipeCategoriesLabels
                    title="categories"
                    category={categories}
                  />
                </div>
              ) : null}

              {cuisine.length ? (
                <div className={styles.recipe__cuisine}>
                  <RecipeCategoriesLabels title="cuisine" category={cuisine} />
                </div>
              ) : null}

              <div className={styles.recipe__servings}>
                <h4>Servings:</h4> <p>{servings}</p>
              </div>
            </div>

            {!user?.recipes.includes(_id) && (
              <span className={styles.recipe__author}>
                By
                <Link href="/">
                  <a>{author?.name}</a>
                </Link>
              </span>
            )}

            <div className={styles.recipe__user__actions}>
              <UserActions recipeID={_id} isPublic={isPublic} />
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.recipe__ingredients_container}>
          <button
            className={styles.recipes__btn__expand}
            type="button"
            onClick={handleOpenTabs}
          >
            Expand
          </button>
          <div className={styles.recipe__ingredients}>
            <h2 className={styles.recipe__subtitle}>Ingredients</h2>
            <Ingredients ingredients={ingredients} recipe={_id} />
          </div>
          <div className={styles.recipe__instructions}>
            <h2 className={styles.recipe__subtitle}>Instructions</h2>
            <Instructions instructions={instructions} comments={comments} />
          </div>
        </div>
      </article>

      <Tabs
        data={{ ingredients, instructions, comments }}
        open={openTabs}
        openTabs={setOpenTabs}
      />
    </>
  );
};

export default RecipePost;
