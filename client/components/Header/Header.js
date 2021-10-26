import Link from "next/link";
import { useRouter } from "next/router";

import useUser from "../../src/useUser";
import { logout } from "../../src/ApiCalls";
import { LinkFilled } from "../Buttons/Buttons";
import LoginNav from "../Navigation/LogInActions";
import Logotype from "../Logotype/Logotype";
import SearchBar from "../Search/SearchDownshift";
import SideNav from "../Navigation/SideNav";
import TopNavBar from "../Navigation/TopNav";

import styles from "./Header.module.css";

const Header = () => {
  const { user } = useUser();
  const router = useRouter();

  const isCreatePage = router.pathname.startsWith("/create");

  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await logout();
    if (response.message) {
      console.log('success');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        {user ? (
          <>
            <div>
              <SideNav user={user} handleLogout={handleLogout} />
              <div className={styles.logotype}>
                <Logotype />
              </div>
            </div>
            {!isCreatePage && (
              <SearchBar
                placeholder="Search and explore recipes..."
                URL="http://localhost:3000/api/v1/recipes/search?q="
              />
            )}
            {!isCreatePage && (
              <span className={styles.header__cta__section}>
                <Link href="/create" passHref>
                  <LinkFilled>Create Recipe</LinkFilled>
                </Link>
              </span>
            )}
            <TopNavBar user={user} handleLogout={handleLogout} />
          </>
        ) : (
          <>
            <div className={styles.logotype}>
              <Logotype />
            </div>
            <SearchBar
              placeholder="Search and explore recipes..."
              URL="http://localhost:3000/api/v1/recipes/search?q="
            />

            <LoginNav router={router} />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
