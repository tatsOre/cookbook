import { FormProvider, useForm } from "react-hook-form";
import { Wizard, useWizard } from "react-use-wizard";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import useSWR from "swr";
import { CLIENT_ASSET_URL, RECIPE_BASE_URL } from "../../config.js";
import { fetchAPI, getData } from "../../src/ApiCalls";

import styles from "./RecipeFactory.module.css";

const cloudinaryURL = "https://api.cloudinary.com/v1_1/dshl3pgv4/upload";

function onError(errors) {
  console.log(errors);
}

async function onFormSubmit(formResult) {
  if (formResult.photo.length > 0) {
    const normalizedFormResult = {
      ...formResult,
      ingredients: formResult.ingredients.map((ingredient) => {
        ingredient.fraction =
          ingredient.fraction === "0" ? "" : ingredient.fraction;
        ingredient.measurement =
          ingredient.measurement === "None" ? "" : ingredient.fraction;
        return ingredient;
      }),
      instructions: formResult.instructions.reduce(
        (previous, current, idx) => ({
          ...previous,
          [idx]: current.instruction,
        })
      ),
    };
    const imageUploadData = new FormData();

    imageUploadData.append("file", formResult.photo[0]);

    //@TODO: make this an env
    imageUploadData.append("upload_preset", "xw6p5o5v");

    const cloudinaryResponse = await fetch(cloudinaryURL, {
      method: "POST",
      body: imageUploadData,
    });
    const imageURL = await cloudinaryResponse.json();
    normalizedFormResult.photo = await imageURL.url;

    const response = await fetchAPI(
      "POST",
      RECIPE_BASE_URL,
      normalizedFormResult
    );
    /*
    if (response.status !== 200) {
      const content = await response.json();
      setWarning({
        show: true,
        messages: content.message,
      });
      return setDisabled(false);
    }
    */
  }
}

const RecipeFactory = () => {
  const FRACTIONS = CLIENT_ASSET_URL("ingredients", "fraction");
  const { data: fractionOptions, error: errorFractions } = useSWR(
    FRACTIONS,
    getData
  );

  const MEASUREMENT = CLIENT_ASSET_URL("ingredients", "measurement");
  const { data: measurementOptions, error: errorMeasurement } = useSWR(
    MEASUREMENT,
    getData
  );

  const defaultValues = {
    instructions: [""],
    photo: "",
    ingredients: [
      {
        fraction: fractionOptions[0],
        unit: "1",
        measurement: measurementOptions[0],
      },
    ],
  };

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const WizardControls = () => {
    const { nextStep, previousStep, isLastStep, isFirstStep } = useWizard();

    const handleStepValidation = async () => {
      const isFormValid = await methods.trigger();
      isFormValid && nextStep();
    };

    return (
      <div className={styles.create__form__controls}>
        <button
          className={`${styles.btn__outlined} ${
            isFirstStep ? styles.btn__hide : styles.btn__display
          }`}
          onClick={() => previousStep()}
        >
          Previous
        </button>
        <button
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

  return (
    <FormProvider {...methods} defaultValues={defaultValues}>
      <form
        onSubmit={methods.handleSubmit(onFormSubmit, onError)}
        className={styles.create__form}
      >
        <Wizard
          startIndex={0}
          footer={<WizardControls />}
          className={styles.create__wizard}
        >
          <Ingredients
            fractionOptions={fractionOptions}
            measurementOptions={measurementOptions}
          />
          <Instructions />
        </Wizard>
      </form>
    </FormProvider>
  );
};

export default RecipeFactory;
