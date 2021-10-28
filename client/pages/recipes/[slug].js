import Layout from "../../components/Layout/Layout";
import RecipePost from "../../components/RecipePost/RecipePost";

export default function RecipePage(props) {
  const { slug } = props;

  return (
    <Layout>
      <RecipePost recipeID={slug} />
    </Layout>
  );
}

RecipePage.getInitialProps = async (context) => {
  return context.query;
};
