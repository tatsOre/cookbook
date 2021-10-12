import { useContext } from "react";
import { userContext } from "../../src/UserContext";

import Layout from "../../components/Layout/Layout";

export default function Home() {
  const { user } = useContext(userContext);
  return (
    <Layout>
      <h1>Hello World</h1>
      <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      ;
    </Layout>
  );
}
