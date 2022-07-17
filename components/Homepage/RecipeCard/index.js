import Link from "next/link";
import RecipeCategoriesLabels from "../../RecipeAssets/RecipeCategories";
import RecipeImage from "../../RecipeAssets/RecipeImage";
import ButtonFavorites from "../../Buttons/ButtonFavorites";
import styles from "./RecipeCard.module.css";

export default function RecipeCard({ data }) {
  const {
    _id,
    title,
    description,
    cuisine,
    categories,
    photo,
    author,
    servings,
    updatedAt,
  } = data;

  const date = new Date(updatedAt).toLocaleDateString("en-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className={styles.card__container}>
      <header>
        <Link href={`/recipes/${_id}`}>
          <a>
            <div className={styles.card__photo}>
              <RecipeImage photo={photo} title={title} />{" "}
            </div>
          </a>
        </Link>

        <div className={styles.card__details}>
          {categories.length ? (
            <div className={styles.card__categories}>
              <RecipeCategoriesLabels
                title="categories"
                category={categories}
              />
            </div>
          ) : null}

          {cuisine.length ? (
            <div className={styles.card__cuisine}>
              <RecipeCategoriesLabels title="cuisine" category={cuisine} />
            </div>
          ) : null}

          <div className={styles.card__servings}>
            <h4>Servings:</h4>
            <p>{servings}</p>
          </div>
        </div>

        <ButtonFavorites id={_id} addTooltip="true" />
      </header>

      <h3 className={styles.card__title}>
        <Link href={`/recipes/${_id}`} passHref>
          <a>{title}</a>
        </Link>
      </h3>

      <p className={styles.card__description}>{description}</p>

      <p className={styles.card__author}>
        <small>Last updated on {date}</small> by <a href="#">{author?.name || "Zeena Willow"}</a>
      </p>

      
    </article>
  );
}
