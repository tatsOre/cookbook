import Link from "next/link";
import RecipeImage from "../RecipeAssets/RecipeImage";
import UserActions from "../User/UserActions";
import styles from "./RecipePill.module.css";

const RecipePill = ({ data }) => {
  const { _id, title, photo, updatedAt, public: isPublic } = data;
  const date = new Date(updatedAt);
  return (
    <div className={styles.card__pill}>
      <Link href={`/recipes/${_id}`}>
        <a>
          <div className={styles.card__photo}>
            <RecipeImage photo={photo} title={title} />{" "}
          </div>
        </a>
      </Link>

      <div className={styles.card__title}>
        <h3 className={styles.card__title}>
          <a href={`/recipes/${_id}`}>{title}</a>
        </h3>
        <p className={styles.card__date}>Last updated: {date.toDateString()}</p>
      </div>
      <div className={styles.card__userActions}>
        <UserActions recipeID={_id} isPublic={isPublic} />
      </div>
    </div>
  );
};

export default RecipePill;
