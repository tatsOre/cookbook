import { IconPlaceholder } from "../General/Icons";
import Logotype from "../Logotype/Logotype";
import Navigation from "../Navbar/Navbar";
import SearchDownshift from "../Search/SearchDownshift";
import useUser from "../../src/useUser";
import styles from "./Header.module.css";

const Header = () => {
  const { user } = useUser();
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
