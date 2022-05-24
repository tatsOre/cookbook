import { useState, useRef } from "react";
import useUser from "../../src/useUser";
import Overlay from "react-bootstrap/Overlay";

import { EDIT_FAVORITES_URL } from "../../config";
import { fetchAPI } from "../../src/ApiCalls";
import styles from "./Buttons.module.css";
import { useRouter } from "next/router";

const IconFavorites = ({ className }) => {
  return (
    <i className={className}>
      <svg x="0px" y="0px" viewBox="0 0 120.2 120.2">
        <path
          d="M60.1,0C26.9,0,0,26.9,0,60.1s26.9,60.1,60.1,60.1s60.1-26.9,60.1-60.1S93.3,0,60.1,0z M79,88.1c0,1.3-0.4,1.5-1.6,1.2
	c-2-1.7-16.3-15.1-16.4-15.2c-0.5-0.4-0.9-0.4-1.3,0.1c-1.2,1-15.3,14.2-16.7,15.5c-0.3,0.3-1.5-0.3-1.5-0.6c0,0,0-51.1,0-52.1
	c0-2.5,1.9-4.3,4.4-4.3c6.1,0,27.1,0,29.1,0c2.1,0,4,1.7,4.1,3.5C78.9,36.7,79,71.3,79,88.1z"
        />
      </svg>
    </i>
  );
};

const ButtonFavorites = ({ id, addTooltip }) => {
  const { user } = useUser();
  const router = useRouter();
  const [tooltip, setTooltip] = useState({
    active: false,
    message: "",
  });
  const [isFav, setFav] = useState(user?.favorites.includes(id) || false);
  const target = useRef(null);
  const classNameIcon = isFav ? styles.icon__active : styles.icon__inactive;

  const handleClickFavorite = async (id) => {
    if (!user) {
      router.push("/login");
    }

    fetchAPI("POST", EDIT_FAVORITES_URL, { recipe: id })
      .then((response) => response.json())
      .then((result) => {
        const isFav = result?.favorites.includes(id);
        const message = isFav
          ? "Added to your favorites"
          : "Removed from your favorites";
        setFav(isFav);
        setTooltip({ active: true, message });
        setTimeout(() => {
          setTooltip({ active: false, message: "" });
        }, 1000);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <button
        ref={target}
        className={`btn-fav ${styles.btn__favorites} ${
          isFav ? styles.btn__active : styles.btn__inactive
        }`}
        type="button"
        onClick={() => handleClickFavorite(id)}
      >
        <IconFavorites className={classNameIcon} />
      </button>
      {addTooltip && (
        <Overlay target={target.current} show={tooltip.active} placement="left">
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{ ...props.style }}
              className={styles.favorites__tooltip}
            >
              {tooltip.message}
            </div>
          )}
        </Overlay>
      )}
    </>
  );
};

export default ButtonFavorites;
