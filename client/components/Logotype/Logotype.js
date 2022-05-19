import Link from "next/link";
import styles from "./Logotype.module.css";

const Logotype = () => {
  return (
    <Link href="/">
      <a className={styles.logotype}><span>My</span>CookBook</a>
    </Link>
  );
};

export default Logotype;
