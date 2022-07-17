import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import RecipeFactory from "../../components/RecipeFactory/RecipeFactory";

function RecipePage(props) {
  const { slug } = props;
  return (
    <Layout>
      <Head>
        <title>Edit your recipe | MyCookBook</title>
      </Head>
      <RecipeFactory recipeID={slug} mode="edit" />
    </Layout>
  );
}

RecipePage.getInitialProps = async (context) => {
  return context.query;
};

export default RecipePage;
