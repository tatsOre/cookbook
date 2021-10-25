import Layout from "../../components/Layout/Layout";
import { ALL_RECIPES_URL, RECIPE_BASE_URL } from "../../config";
import RecipeFactory from "../../components/RecipeFactory/RecipeFactory";

function RecipePage(props) {
  const { slug } = props;
  return (
    <Layout>
      <RecipeFactory recipeID={slug} mode="edit" />
    </Layout>
  );
}

RecipePage.getInitialProps = async (context) => {
  return context.query;
}

export default RecipePage;
