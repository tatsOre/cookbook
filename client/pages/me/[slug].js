import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import Dashboard from "../../components/UserDashboard/Dashboard";

export default function UserDashboard({ slug }) {
  return (
    <Layout>
      <Head>
        <title>My CookBook | My {slug.replace("_", " ")}</title>
      </Head>
      <Dashboard tab={slug} />
    </Layout>
  );
}

UserDashboard.getInitialProps = async (context) => {
  return context.query;
};
