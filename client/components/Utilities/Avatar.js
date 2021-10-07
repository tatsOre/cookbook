import styles from "./utilities.module.css";

const UserAvatar = ({ pic, altText, size = "sm" }) => {
  const className = size === "lg" ? styles.large : styles.small;
  return (
    <div className={`${styles.user__avatar} ${className}`}>
      <img src={pic} alt={altText} />
    </div>
  );
};

export { UserAvatar };
