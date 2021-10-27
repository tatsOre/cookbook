import useSWR from "swr";
import { getData } from "../../src/ApiCalls";
import { LATEST_RECIPES_URL } from "../../config";
import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./RecipesSection.module.css";
import { useEffect, useState } from "react";

const RecipeSection = () => {
  const { data, error } = useSWR(LATEST_RECIPES_URL, getData);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (data) setRecipes(data.recipes);
  }, [data]);

  if (error) return <div>Failed to load.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.recipes__section}>
      {recipes.map((recipe) => (
        <div className={styles.card__container}>
          <RecipeCard key={recipe._id} recipe={recipe} />
        </div>
      ))}
    </div>
  );
};

export default RecipeSection;
