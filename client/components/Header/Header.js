import Link from "next/link";

import { LogoPlaceholder } from "../General/Icon";
import Navigation from "../Navbar/Navbar";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <LogoPlaceholder />
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
