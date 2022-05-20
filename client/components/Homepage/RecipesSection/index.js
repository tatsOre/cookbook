import { useEffect, useState } from "react";
import useSWR from "swr";
import RecipeCard from "../RecipeCard";
import { getData } from "../../../src/ApiCalls";

import styles from "./index.module.css";

export default function RecipesByCategory({ sourceURL }) {
  const { data, error } = useSWR(sourceURL, getData);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (data) setRecipes(data.recipes);
  }, [data]);

  if (error) return <div>Failed to load.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} data={recipe} />
      ))}
    </>
  );
}
