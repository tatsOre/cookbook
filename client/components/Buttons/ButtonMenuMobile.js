import styles from "./Buttons.module.css";

const ButtonMenuMobile = ({ handleShow }) => {
  return (
    <button
      className={`${styles.button} ${styles.button__mobile}`}
      onClick={handleShow}
    >
      <div className={styles.button__mobile__icon}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </button>
  );
};

export default ButtonMenuMobile;
