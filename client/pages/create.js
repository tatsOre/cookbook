import Head from "next/head";
import Layout from "../components/Layout/Layout";
import RecipeFactory from "../components/RecipeFactory/RecipeFactory";

export default function CreateRecipe() {
  return (
    <Layout>
      <Head>
        <title>Create new recipe | MyCookBook</title>
      </Head>
      <RecipeFactory />
    </Layout>
  );
}
