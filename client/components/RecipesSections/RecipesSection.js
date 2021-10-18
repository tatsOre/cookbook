import useSWR from "swr";
import { getData } from "../../src/ApiCalls";
import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./RecipesSection.module.css";

const RecipeSection = () => {
  const { data, error } = useSWR(
    "http://localhost:3000/api/v1/recipes/latest",
    getData
  );
  if (error) return <div>Failed to load.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <section className={styles.recipes__section}>
      <h2 className={styles.section__recipes__title}>
        <span>Explore</span>
        <br />
        the latest recipes
      </h2>
      <div className={styles.section__recipes__container}>
        {data.recipes.map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
      </div>
    </section>
  );
};

export default RecipeSection;
