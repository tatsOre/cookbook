import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./RecipesSection.module.css";

const RecipeSection = ({ title, recipes }) => {
  return (
    <section className={styles.recipes__section}>
      <h2 className={styles.section__recipes__title}>{title}</h2>
      <div className={styles.section__recipes__container}>
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
      </div>
    </section>
  );
};

export default RecipeSection;
