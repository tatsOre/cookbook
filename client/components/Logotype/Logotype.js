import Image from "next/image";
import Link from "next/link";
import styles from "./Logotype.module.css";

const Logotype = () => {
  return (
    <Link href="/">
      <a className={styles.logotype}>
        <Image
          aria-hidden="true"
          width="30"
          height="30"
          src="/icons/logo-icon.svg"
        />
      </a>
    </Link>
  );
};

export default Logotype;
