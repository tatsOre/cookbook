import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { capitalizeStr } from "../../src/utils";
import useUser from "../../src/useUser";
import RecipeCategoriesLabels from "../RecipeAssets/RecipeCategories";
import RecipeImage from "../RecipeAssets/RecipeImage";
import Instructions from "./Instructions";
import Ingredients from "./Ingredients";
import Tabs from "./Tabs/FullViewTabs";
import UserActions from "../User/UserActions";

import { RECIPE_BASE_URL } from "../../config";
import { getData } from "../../src/ApiCalls";

import styles from "./RecipePost.module.css";

const RecipePost = ({ recipeID }) => {
  const { user } = useUser();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  const [openTabs, setOpenTabs] = useState(false);
  const handleOpenTabs = () => setOpenTabs(true);

  useEffect(async () => {
    try {
      const response = await getData(`${RECIPE_BASE_URL}/${recipeID}`);
      setRecipe(response);
      document.title = `${capitalizeStr(response.title)} | My CookBook`;
    } catch (error) {
      setError("Something went wrong.");
    }
  }, []);

  if (!recipe && !error) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

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
            <div className={styles.recipe__user__actions}>
              <UserActions recipeID={_id} isPublic={isPublic} />
            </div>
            <p className={styles.recipe__description}>
              <span className={styles.firstcharacter}>
                {description.charAt(0)}
              </span>
              {description.slice(1, -1)}
            </p>

            {!user?.recipes.includes(_id) && (
              <span className={styles.recipe__author}>
                By
                <Link href="/">
                  <a>{author?.name}</a>
                </Link>
              </span>
            )}

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
          </div>
        </div>
        <hr />
        <div className={styles.recipe__ingredients_container}>
          <button
            className={styles.recipes__btn__expand}
            type="button"
            onClick={handleOpenTabs}
          >
            <Image
              aria-hidden="true"
              width="20"
              height="20"
              src="/icons/expand-icon.svg"
            />
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
