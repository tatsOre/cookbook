import Link from "next/link";

import { LogoPlaceholder } from "../General/Icon";
import MobileNav from "../Navbar/MobileNav";
import Navigation from "../Navbar/Navbar";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link href="/">
          <LogoPlaceholder />
        </Link>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
