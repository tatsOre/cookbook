import Logotype from "../Logotype/Logotype";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__text}>
          <p>My CookBook App, 2022. 1.2.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
