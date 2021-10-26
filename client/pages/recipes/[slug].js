import useSWR from "swr";
import Layout from "../../components/Layout/Layout";
import RecipePost from "../../components/RecipePost/RecipePost";
import { RECIPE_BASE_URL } from "../../config";
import { getData } from "../../src/ApiCalls";

export default function RecipePage({ slug }) {
  const URL = `${RECIPE_BASE_URL}/${slug}`;
  const { data, error } = useSWR(URL, getData);

  return (
    <Layout>
      {!data && !error && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      {data && <RecipePost recipe={data} />}
    </Layout>
  );
}

RecipePage.getInitialProps = async (context) => {
  return context.query;
};
