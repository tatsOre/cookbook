import RecipeImage from "../RecipeAssets/RecipeImage";
import UserActions from "../User/UserActions";
import styles from "./RecipePill.module.css";

const RecipePill = ({ data }) => {
  const { _id, title, photo, updatedAt, public: isPublic } = data;
  const date = new Date(updatedAt);
  return (
    <div className={styles.card__pill}>
      <div className={styles.card__photo}>
        <RecipeImage photo={photo} title={title} />
      </div>

      <div>
        <h3 className={styles.card__title}>
          <a href={`/recipes/${_id}`}>{title}&nbsp;&nbsp;&nbsp; ➜</a>
        </h3>
        <p className={styles.card__date}>Last updated: {date.toDateString()}</p>
        <div className={styles.card__userActions}>
          <UserActions recipeID={_id} isPublic={isPublic} />
        </div>
      </div>
    </div>
  );
};

export default RecipePill;
