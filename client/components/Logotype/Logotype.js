import Image from "next/image";
import styles from "./Logotype.module.css";

const Logotype = () => {
  return (
    <div className={styles.logotype}>
      <Image
        aria-hidden="true"
        width="30"
        height="30"
        src="/icons/logo-icon.svg"
      />
    </div>
  );
};

export default Logotype;
