import Layout from "../components/Layout/Layout";
import RecipeSection from "../components/RecipesSections/RecipesSection";

export default function Home() {
  return (
    <Layout>
      <RecipeSection />
      <RecipeSection />
    </Layout>
  );
}
