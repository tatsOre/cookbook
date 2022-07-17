import Head from "next/head";
import Login from "../components/Login/LoginForm";
import Layout from "../components/Layout/Layout";

export default function LoginPage() {
  return (
    <Layout>
      <Head>
        <title>Login | MyCookBook</title>
      </Head>
      <Login />
    </Layout>
  );
}
