import Layout from "../../components/Layout/Layout";
import Dashboard from "../../components/UserDashboard/Dashboard";

export default function UserDashboard({ slug }) {
  return (
    <Layout>
      <Dashboard tab={slug} />
    </Layout>
  );
}

UserDashboard.getInitialProps = async (context) => {
  return context.query;
};
