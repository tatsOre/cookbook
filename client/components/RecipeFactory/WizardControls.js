import { useWizard } from "react-use-wizard";

import styles from "./RecipeFactory.module.css";

const WizardControls = ({ methods }) => {
  const { nextStep, previousStep, isLastStep, isFirstStep } = useWizard();

  const handleStepValidation = async () => {
    const isFormValid = await methods.trigger();
    isFormValid && nextStep();
  };

  return (
    <div className={styles.create__form__controls}>
      <button
        type="button"
        className={`${styles.btn__outlined} ${
          isFirstStep ? styles.btn__hide : styles.btn__display
        }`}
        onClick={() => previousStep()}
      >
        Previous
      </button>
      <button
        type="button"
        className={`${styles.btn__outlined} ${
          isLastStep ? styles.btn__hide : styles.btn__display
        }`}
        onClick={handleStepValidation}
      >
        Next
      </button>
    </div>
  );
};

export default WizardControls;
