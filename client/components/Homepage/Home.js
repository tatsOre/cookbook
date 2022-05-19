import useUser from "../../src/useUser";
import RecipeSection from "../RecipesSections/RecipesSection";

import styles from "./Home.module.css";

const Home = () => {
  const { user } = useUser();

  return (
    <div className={styles.homepage__container}>
      <div className={styles.home__hero}>
        {user ? (
          <p>Welcome back, {user.name.split(" ")[0]}.</p>
        ) : (
          <>
            <h1>It's all about the food.</h1>
            <p>Create. Save. Share.</p>
            <a href="/signup">Start Now!</a>
          </>
        )}
      </div>
      <h2>
        <span>Explore</span>
        <br />
        the latest recipes
      </h2>
      <RecipeSection />
    </div>
  );
};

export default Home;
