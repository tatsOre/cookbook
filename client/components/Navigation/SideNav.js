import Link from "next/link";
import { useState } from "react";

import CloseButton from "react-bootstrap/CloseButton";
import Image from "react-bootstrap/Image";
import Offcanvas from "react-bootstrap/Offcanvas";

import { AVATAR_DEFAULT } from "../../config";
import ButtonMenuMobile from "../Buttons/ButtonMenuMobile";

import styles from "./Navigation.module.css";

const SideNav = ({ user, handleLogout }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={styles.navigation__mobile}>
      <ButtonMenuMobile handleShow={handleShow} />
      <Offcanvas show={show} onHide={handleClose}>
        <div className={styles.offcanvas__header}>
          <CloseButton onClick={handleClose} />
          <Image
            height={50}
            width={50}
            src={`${user?.photo || AVATAR_DEFAULT}`}
            alt={user?.name || ""}
            roundedCircle
          />
          <h3>Hello{user?.name && `, ${user?.name.split(" ")[0]}.`}</h3>
        </div>
        <div className={styles.offcanvas__body}>
          <nav>
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
            <hr />

            <button onClick={handleLogout}>Logout</button>
          </nav>
        </div>
      </Offcanvas>
    </div>
  );
};

export default SideNav;
