import Head from "next/head";
import Layout from "../components/Layout/Layout";
import RecipeSection from "../components/RecipesSections/RecipesSection";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>MyCookBook | Create, save and share your recipes</title>
      </Head>
      <RecipeSection />
      <RecipeSection />
    </Layout>
  );
}
