import Head from "next/head";
import Layout from "../components/Layout/Layout";
import RecipeSection from "../components/RecipesSections/RecipesSection";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>MyCookBook | Create, save and share your recipes</title>
      </Head>
      <div>
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
    </Layout>
  );
}
