import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav>
      <Link href="/">
        <a>Link No. 1</a>
      </Link>
      <Link href="/">
        <a>Link No. 2</a>
      </Link>
      <Link href="/">
        <a>Link No. 3</a>
      </Link>
    </nav>
  );
};

export default Navbar;
