import styles from "./utilities.module.css";

const UserAvatar = ({ pic, altText, size = "sm" }) => {
  const placeholder =
    pic ||
    "https://thumbs.dreamstime.com/z/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg";
  const className = size === "lg" ? styles.large : styles.small;
  return (
    <div className={`${styles.user__avatar} ${className}`}>
      <img src={placeholder} alt={altText} />
    </div>
  );
};

export { UserAvatar };
