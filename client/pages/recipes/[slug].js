import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import RecipePost from "../../components/RecipePost/RecipePost";
import { capitalizeStr } from "../../src/utils";
import { ALL_RECIPES_URL, RECIPE_BASE_URL } from "../../config";

export default function RecipePage({ recipe }) {
  return (
    <Layout>
      <Head>
        <title>{`${capitalizeStr(recipe.title)} | MyCookBook`}</title>
      </Head>
      <RecipePost recipe={recipe} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(ALL_RECIPES_URL);
  const data = await res.json();

  const paths = data.recipes.map((post) => ({
    params: { slug: post._id },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${RECIPE_BASE_URL}/${params.slug}`);
  const recipe = await res.json();

  return { props: { recipe } };
}
