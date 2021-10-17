import styles from "./Icons.module.css";

const IconPlaceholder = ({ iconlabel }) => {
  return (
    <div className={styles.icon__background}>
      <span className={styles.icon__label}>{iconlabel}</span>
    </div>
  );
};

export { IconPlaceholder };
