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
import { CURRENT_USER_URL, SEARCH_RECIPES_URL } from "../../config";
import { useSWRConfig } from "swr";

const Header = () => {
  const { user } = useUser();
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const isCreatePage = router.pathname.startsWith("/create");

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await logout();
      if (response.message) {
        router.push("/");
        mutate(CURRENT_USER_URL);
      }
    } catch (error) {
      console.log(error);
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
                URL={SEARCH_RECIPES_URL}
              />
            )}
            {!isCreatePage && (
              <span className={styles.header__cta__section}>
                <Link href="/create" passHref>
                  <LinkFilled>Create Recipe</LinkFilled>
                </Link>
              </span>
            )}
            <TopNavBar user={user} handleLogout={(e) => handleLogout(e)} />
          </>
        ) : (
          <>
            <div className={styles.logotype}>
              <Logotype />
            </div>
            <SearchBar
              placeholder="Search and explore recipes..."
              URL={SEARCH_RECIPES_URL}
            />

            <LoginNav router={router} />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
