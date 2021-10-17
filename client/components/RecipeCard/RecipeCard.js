import UserActions from "../User/UserActions";
import styles from "./RecipeCard.module.css";

const RecipeCard = ({ recipe }) => {
  console.log(recipe);
  const {
    _id,
    title,
    description,
    cuisine,
    categories,
    photo,
    author,
    servings,
    public: isPublic,
  } = recipe;

  const categoriesContent = categories?.length
    ? categories.map((c) => <li>{c}</li>)
    : null;

  const cuisineContent = cuisine?.length
    ? cuisine.map((c) => <li>{c}</li>)
    : null;

  return (
    <div className={styles.card__container}>
      <div className={styles.card__header}>
        <div className={styles.card__image}>
          <a href={`/recipes/${_id}`}>
            <img src={photo} alt={title} />
          </a>
        </div>

        <div className={styles.card__details}>
          {categoriesContent && (
            <div className={styles.card__categories}>
              <h4>Categories</h4>
              <ul>{categoriesContent}</ul>
            </div>
          )}

          {cuisineContent && (
            <div className={styles.card__cuisine}>
              <h4>Cuisine</h4>
              <ul>{cuisineContent}</ul>
            </div>
          )}

          <div className={styles.card__servings}>
            <h4>Servings:</h4>
            <p>{servings}</p>
          </div>
        </div>
      </div>

      <div className={styles.card__body}>
        <h3 className={styles.card__title}>
          <a href={`/recipes/${_id}`}>{title}</a>
        </h3>

        <p className={styles.card__description}>{description}</p>
        <p className={styles.card__author}>
          By <a href="#">{author?.name || "Beautiful User Name"}</a>
        </p>

        <div className={styles.card__user__actions}>
          <UserActions recipeID={_id} isPublic={isPublic} />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
