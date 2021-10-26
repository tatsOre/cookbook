import RecipeSection from "../RecipesSections/RecipesSection";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homepage__container}>
      <h1>Hero</h1>
      <h2>
        <span>Explore</span>
        <br />
        the latest recipes
      </h2>
      <RecipeSection />
      <h2>
        <span>Enjoy</span>
        <br />
        the most rated recipes
      </h2>
      <RecipeSection />
    </div>
  );
};

export default Home;
