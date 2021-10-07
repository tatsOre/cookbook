import Nav from "../Navbar/Navbar";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div>
          <a>Super App Logo!</a>
        </div>

        <div>
          <Nav />
        </div>
      </div>
    </header>
  );
};

export default Header;
