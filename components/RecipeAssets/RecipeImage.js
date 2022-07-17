import styles from "./RecipeAssets.module.css";

const RecipeImage = ({ photo, title }) => {
  return (
    <figure className={styles.recipe__image}>
      <img src={photo || "/images/meal-default.png"} alt={title} />
      <figcaption>{title}</figcaption>
    </figure>
  );
};

export default RecipeImage;
