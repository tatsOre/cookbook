import Layout from "../../components/Layout/Layout";
import RecipePost from "../../components/RecipePost/RecipePost";
import { endpoint } from "../../config";

export default function RecipePage({ recipe }) {
  return (
    <Layout>
      <RecipePost recipe={recipe} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${endpoint}/api/v1/recipes`);
  const data = await res.json();

  const paths = data.recipes.map((post) => ({
    params: { slug: post._id },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${endpoint}/api/v1/recipe/${params.slug}`);
  const recipe = await res.json();

  return { props: { recipe } };
}
