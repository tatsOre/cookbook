import styles from "./RecipeInstructions.module.css";

const RecipeInstructions = ({ instructions, comments }) => {
  return (
    <>
      <ul>
        {Object.values(instructions).map((step, index) => (
          <li key={`step-${index + 1}`}>
            <div className={styles.instructions__item}>
              <p className={styles.instructions__label}>{index + 1}.</p>
              <p className={styles.instructions__step}>{step}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className={styles.instructions__comments}>{comments}</p>
    </>
  );
};

export default RecipeInstructions;
