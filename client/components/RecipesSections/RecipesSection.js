import useSWR from "swr";
import { getData } from "../../src/ApiCalls";
import { LATEST_RECIPES_URL } from "../../config";
import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./RecipesSection.module.css";

const RecipeSection = () => {
  const { data, error } = useSWR(LATEST_RECIPES_URL, getData);
  if (error) return <div>Failed to load.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.recipes__section}>
      {data.recipes.map((recipe) => (
        <div className={styles.card__container}>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
};

export default RecipeSection;
