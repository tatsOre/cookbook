import Link from "next/link";

import { useContext, useState } from "react";
import { userContext } from "../../src/UserContext";

import { UserAvatar } from "../Utilities/Avatar";

import CloseButton from "react-bootstrap/CloseButton";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

import styles from "./Navbar.module.css";

import { logout } from "../../src/ApiCalls";

const TopNavBar = () => {
  const handleLogout = () => logout();
  return (
    <div className={styles.topnav__container}>
      <div className={styles.topnav__usermenu}>
        <p>Signed in as: </p>
        <NavDropdown
          title="Lipa Echeverry"
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

const SideNavBar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={styles.sidenav__container}>
      <button variant="primary" onClick={handleShow}>
        Open Menu
      </button>

      <Offcanvas show={show} onHide={handleClose}>
        <div className={styles.sidenav__header}>
          <CloseButton onClick={handleClose} />
          <UserAvatar pic="" altText="Mark Photo" size="lg" />
          <h3>Welcome, Mark.</h3>
        </div>
        <div className={styles.sidenav__body}>
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
          </nav>
        </div>
      </Offcanvas>
    </div>
  );
};

const Navigation = () => {
  const { user } = useContext(userContext);
  return (
    <nav>
      {user && (
        <>
          <TopNavBar />
          <SideNavBar />
        </>
      )}
      {!user && (
        <span>
          Already have an account? <a href="/login"> Login</a> or{" "}
          <a href="/signup">create one</a>
        </span>
      )}
    </nav>
  );
};

export default Navigation;
