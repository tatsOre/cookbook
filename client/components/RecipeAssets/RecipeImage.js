import styles from "./RecipeAssets.module.css";

const RecipeImage = ({ photo, title }) => {
  return (
    <div className={styles.recipe__image}>
      <img src={photo || "/images/meal-default.png"} alt={title} />
    </div>
  );
};

export default RecipeImage;
