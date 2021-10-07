import styles from "./general.module.css";

const IconPlaceholder = ({ iconlabel }) => {
  return (
    <div className={styles.icon__background}>
      <span className={styles.icon__label}>{iconlabel}</span>
    </div>
  );
};

const LogoPlaceholder = () => {
  return (
    <div className={styles.logotype}>
      <IconPlaceholder iconlabel="L" />
      <p>App Logo</p>
    </div>
  );
};
export { IconPlaceholder, LogoPlaceholder };
