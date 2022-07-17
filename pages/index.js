import Head from "next/head";
import Home from "../components/Homepage/Home";
import Layout from "../components/Layout/Layout";

function Indexpage() {
  return (
    <Layout>
      <Head>
        <title>MyCookBook | Create, save and share your recipes</title>
      </Head>
      <Home />
    </Layout>
  );
}

export default Indexpage;
