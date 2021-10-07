import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header>
        <Navbar />
      </Header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
