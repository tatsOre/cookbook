import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { logout } from "../../src/ApiCalls";
import useUser from "../../src/useUser";
import CloseButton from "react-bootstrap/CloseButton";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
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
          <NavDropdown.Item href="/">Account</NavDropdown.Item>
          <NavDropdown.Item href="/">Recipes</NavDropdown.Item>
          <NavDropdown.Item href="/">Favorites</NavDropdown.Item>
          <NavDropdown.Item href="/">Shopping Lists</NavDropdown.Item>
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
            <Link href="/">
              <a>Account</a>
            </Link>
            <Link href="/">
              <a>Recipes</a>
            </Link>
            <Link href="/">
              <a>Favorites</a>
            </Link>
            <Link href="/">
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
  const router = useRouter();
  const { user } = useUser();

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
        </>
      )}
      {!user && (
        <div>
          <Link href="/login" passHref>
            <LinkFilled>Login</LinkFilled>
          </Link>

          <Link href="/signup" passHref>
            <LinkOutlined>Sign Up</LinkOutlined>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
