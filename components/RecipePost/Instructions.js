import styles from "./Instructions.module.css";

const RecipeInstructions = ({ instructions, comments }) => {
  return (
    <>
      <ul className={styles.instructions__list}>
        {Object.values(instructions).map((step, index) => (
          <li key={`step-${index + 1}`} className={styles.instructions__item}>
            <p className={styles.instructions__label}>Step {index + 1}</p>
            <p className={styles.instructions__step}>{step}</p>
          </li>
        ))}
      </ul>
      <hr />
      <p className={styles.instructions__comments}>{comments}</p>
    </>
  );
};

export default RecipeInstructions;
