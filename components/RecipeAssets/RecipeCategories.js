import styles from "./RecipeAssets.module.css";

const RecipeCategoriesLabels = ({ title, category }) => {
  const categoryContent = category?.length
    ? category.map((item) => <li key={`${item}`}>{item}</li>)
    : null;
  return (
    <>
      {categoryContent && (
        <>
          <h4 className={styles.categories__title}>{title}</h4>
          <ul className={styles.categories__list}>{categoryContent}</ul>
        </>
      )}
    </>
  );
};

export default RecipeCategoriesLabels;
