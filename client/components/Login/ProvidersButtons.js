import Link from "next/link";
import Image from "next/image";
import styles from "./ProvidersButtons.module.css";
import { LOGIN_WITH_GOOGLE_URL } from "../../config";

const ProvidersButtons = () => {
  return (
    <div>
      <div className={styles.divider}>
        <div className={styles.divider__line}></div>
        <p className={styles.divider__text}>or</p>
      </div>
      <Link href={LOGIN_WITH_GOOGLE_URL}>
        <div className={styles.google__auth}>
          <Image
            aria-hidden="true"
            width="20"
            height="20"
            src="/icons/google-logo-icon.svg"
          />
          <a className={styles.google__link}>Continue with Google</a>
        </div>
      </Link>
    </div>
  );
};

export default ProvidersButtons;
