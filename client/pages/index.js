import Layout from "../components/Layout/Layout";
import RecipeSection from "../components/RecipesSections/RecipesSection";

export default function Home({ latest = [] }) {
  return (
    <Layout>
      <RecipeSection
        title={
          <>
            <span>Explore</span>
            <br />
            the latest recipes
          </>
        }
        recipes={latest}
      />
      <RecipeSection
        title={
          <>
            <span>Featured</span>
            <br />
            of the month
          </>
        }
        recipes={latest}
      />
    </Layout>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3000/api/v1/recipes/latest");
  const result = await response.json();
  return {
    props: {
      latest: result?.recipes,
    },
  };
}
