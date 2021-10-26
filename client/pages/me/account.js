import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import Dashboard from "../../components/UserDashboard/Dashboard";

export default function UserDashboard() {
  return (
    <Layout>
      <Head>
        <title>My CookBook | Account </title>
      </Head>
      <Dashboard tab="recipes" />
    </Layout>
  );
}
