import { useContext, useState } from "react";
import { userContext } from "../../src/UserContext";
import Logotype from "../Logotype/Logotype";
import Navigation from "../Navbar/Navbar";
import SearchDownshift from "../Search/SearchDownshift";
import { IconPlaceholder } from "../General/Icons";
import styles from "./Header.module.css";

const Header = () => {
  const { user, setUser } = useContext(userContext);
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Logotype />
        <SearchDownshift />
        <Navigation />
        {user && (
          <button className={styles.button__useraccount}>
            <IconPlaceholder iconlabel="U" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
