import Head from "next/head";
import Layout from "../components/Layout/Layout";
import SignUp from "../components/SignUp/SignUpForm";

export default function SignUpPage() {
  return (
    <Layout>
      <Head>
        <title>Register | MyCookBook</title>
      </Head>
      <SignUp />
    </Layout>
  );
}
