import Link from "next/link";
import NavDropdown from "react-bootstrap/NavDropdown";

import styles from "./Navigation.module.css";

const TopNavBar = ({ user, handleLogout }) => {
  return (
    <div className={styles.navigation__top}>
      <p>Signed in as: </p>
      <NavDropdown
        className={styles.top__nav__dropdown}
        title={user?.name}
        id="collasible-nav-dropdown"
        align="end"
      >
        <nav className={styles.top__nav__list}>
          <Link href="/create">
            <a>create recipe</a>
          </Link>
          <Link href="/me">
            <a>Account</a>
          </Link>
          <Link href="/me/recipes">
            <a>my recipes</a>
          </Link>
          <Link href="/me/favorites">
            <a>Favorites</a>
          </Link>
          <Link href="/me/shopping_lists">
            <a>Shopping Lists</a>
          </Link>
          <a onClick={handleLogout}>Logout</a>
        </nav>
      </NavDropdown>
    </div>
  );
};

export default TopNavBar;
