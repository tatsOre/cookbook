import Logotype from "../Logotype/Logotype";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div>
          <Logotype />
        </div>

        <div className={styles.footer__text}>
          <p>The CookBook App, 2021</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
