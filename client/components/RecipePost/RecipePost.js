import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { capitalizeStr } from "../../src/utils";
import useUser from "../../src/useUser";
import ButtonFavorites from "../Buttons/ButtonFavorites";
import RecipeCategoriesLabels from "../RecipeAssets/RecipeCategories";
import RecipeImage from "../RecipeAssets/RecipeImage";
import Instructions from "./Instructions";
import Ingredients from "./Ingredients";
import Tabs from "./Tabs/FullViewTabs";
import UserActions from "../User/UserActions";

import { RECIPE_BASE_URL } from "../../config";
import { getData } from "../../src/ApiCalls";

import styles from "./RecipePost.module.css";
import { useRouter } from "next/router";

const RecipePost = ({ recipeID }) => {
  const { user } = useUser();
  const router = useRouter();
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
  }, [recipeID]);

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
    updatedAt,
  } = recipe;

  const date = new Date(updatedAt).toLocaleDateString("en-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <article className={styles.recipe}>
        <header>
          {!user?.recipes.includes(_id) ? (
            <ButtonFavorites id={_id} addTooltip={true} />
          ) : null}

          <RecipeImage photo={photo} title={title} />

          <h1 className={styles.recipe__title}>{title}</h1>

          <p className={styles.recipe__author}>
            Last updated on {date}
            {!user?.recipes.includes(_id) ? (
              <span>
                {" "}
                by <a href="#"> {author?.name || "Zeena Willow"}</a>
              </span>
            ) : null}
          </p>

          <p
            className={`${styles.recipe__description} ${
              description.length > 140 ? styles.with__capital : ""
            }`}
          >
            {description}
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

          {user?.recipes.includes(_id) ? (
            <div className={styles.recipe__user__actions}>
              <UserActions recipeID={_id} isPublic={isPublic} />
            </div>
          ) : null}
        </header>

        <hr />

        <section>
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
        </section>
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
