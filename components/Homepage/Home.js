import useUser from "../../src/useUser";
import RecipesByCategory from "./RecipesSection";
import { LATEST_RECIPES_URL } from "../../config";

import styles from "./Home.module.css";

export default function Home() {
  const { user } = useUser();

  return (
    <div className={styles.homepage__container}>
      <p
        style={{
          padding: "1rem",
          color: "tomato",
          fontSize: '12px'
        }}
      >
        🔧 The kitchen is under maintenance. Time to chill and call KFC.
      </p>
      <section className={styles.home__hero}>
        {user ? (
          <p className={styles.home__welcome}>
            Welcome, {user.name.split(" ")[0]}.
          </p>
        ) : (
          <>
            <h1>It's all about the food.</h1>
            <p>Create. Save. Share.</p>
            <a href="/signup">Start Now!</a>
          </>
        )}
      </section>

      <section className={styles.recipes__section}>
        <h2>
          <span>Explore</span>
          <br />
          the latest recipes
        </h2>
        <RecipesByCategory sourceURL={LATEST_RECIPES_URL} />
      </section>
    </div>
  );
}
