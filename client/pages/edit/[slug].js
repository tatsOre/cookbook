import Layout from "../../components/Layout/Layout";
import { ALL_RECIPES_URL, RECIPE_BASE_URL } from "../../config";

export default function RecipePage({ recipe }) {
  return (
    <Layout>
      <h1>Edit {recipe._id}</h1>
      <h2>Recipe Data:</h2>
      <pre>{JSON.stringify(recipe, null, 2)}</pre>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(ALL_RECIPES_URL);
  const data = await res.json();

  const paths = data.recipes.map((post) => ({
    params: { slug: post._id },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${RECIPE_BASE_URL}/${params.slug}`);
  const recipe = await res.json();

  return { props: { recipe } };
}
