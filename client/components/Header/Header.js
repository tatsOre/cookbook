import Link from "next/link";
import { useRouter } from "next/router";
import { LinkFilled } from "../Buttons/Buttons";
import Navigation from "../Navbar/Navbar";
import SearchBar from "../Search/SearchDownshift";
import useUser from "../../src/useUser";

import styles from "./Header.module.css";

const Header = () => {
  const { user } = useUser();
  const router = useRouter();
  const show = !router.pathname.startsWith("/create") && user;

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        {show && (
          <SearchBar
            placeholder="Search and explore recipes..."
            URL="http://localhost:3000/api/v1/recipes/search?q="
          />
        )}

        <Navigation />
        {show && (
          <span className={styles.header__cta__link}>
            <Link href="/create" passHref>
              <LinkFilled>Create Recipe</LinkFilled>
            </Link>
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
