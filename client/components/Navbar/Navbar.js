import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { logout } from "../../src/ApiCalls";
import useUser from "../../src/useUser";
import CloseButton from "react-bootstrap/CloseButton";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Logotype from "../Logotype/Logotype";
import { AVATAR_DEFAULT } from "../../config";
import ButtonMenuMobile from "../Buttons/ButtonMenuMobile";
import { LinkFilled, LinkOutlined } from "../Buttons/Buttons";

import styles from "./Navbar.module.css";

const TopNavBar = ({ user, handleLogout }) => {
  return (
    <div className={styles.navigation__top}>
      <div className={styles.navigation__top__menu}>
        <p>Signed in as: </p>
        <NavDropdown
          className={styles.navigation__top__dropdown}
          title={user?.name}
          id="collasible-nav-dropdown"
          align="end"
        >
          <NavDropdown.Item href="/create">Create Recipe</NavDropdown.Item>
          <NavDropdown.Item href="/me/account">Account</NavDropdown.Item>
          <NavDropdown.Item href="/me">Recipes</NavDropdown.Item>
          <NavDropdown.Item href="/me">Favorites</NavDropdown.Item>
          <NavDropdown.Item href="/me">Shopping Lists</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/" onClick={handleLogout}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </div>
  );
};

const SideNavBar = ({ user, handleLogout }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { name, photo } = user;

  return (
    <div className={styles.navigation__mobile}>
      <ButtonMenuMobile handleShow={handleShow} />
      <Offcanvas show={show} onHide={handleClose}>
        <div className={styles.side__header}>
          <CloseButton onClick={handleClose} />
          <Image
            height={50}
            width={50}
            src={`${photo || AVATAR_DEFAULT}`}
            alt={name || ""}
            roundedCircle
          />
          <h3>Hello{name && `, ${name.split(" ")[0]}.`}</h3>
        </div>
        <div className={styles.side__body}>
          <nav>
            <Link href="/create">
              <a>create recipe</a>
            </Link>
            <Link href="/me/account">
              <a>Account</a>
            </Link>
            <Link href="/me">
              <a>my recipes</a>
            </Link>
            <Link href="/me">
              <a>Favorites</a>
            </Link>
            <Link href="/me">
              <a>Shopping Lists</a>
            </Link>
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </nav>
        </div>
      </Offcanvas>
    </div>
  );
};

const Navigation = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleClickLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className={styles.navigation}>
      {user && (
        <>
          <TopNavBar user={user} handleLogout={handleClickLogout} />
          <SideNavBar user={user} handleLogout={handleClickLogout} />
          <Logotype />
        </>
      )}
      {!user && (
        <>
          <Logotype />
          <div>
            {!router.pathname.startsWith("/login") && (
              <Link href="/login" passHref>
                <LinkFilled>Login</LinkFilled>
              </Link>
            )}
            {!router.pathname.startsWith("/signup") && (
              <Link href="/signup" passHref>
                <LinkOutlined>Sign Up</LinkOutlined>
              </Link>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navigation;
