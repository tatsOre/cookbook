import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import { Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { Wizard, useWizard } from "react-use-wizard";

import styles from "./RecipeFactory.module.css";

const cloudinaryURL = "https://api.cloudinary.com/v1_1/dshl3pgv4/upload";

const fractionOptions = ["0", "1/8", "1/4", "1/3", "1/2", "2/3", "3/4"];
const measurementOptions = [
  "Teaspoon",
  "Tablespoon",
  "Cup",
  "Gallon",
  "Grams",
  "Kilograms",
  "Ounces",
  "Litres",
  "None",
];
const categoriesOptions = [
  "Lunch",
  "Dinner",
  "Dessert",
  "Appetizer",
  "Beverage",
  "Miscellaneous",
];

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

function onError(errors) {
  console.log(errors);
}

async function onFormSubmit(formResult) {
  if (formResult.photo.length > 0) {
    const normalizedFormResult = {
      ...formResult,
      instructions: formResult.instructions.reduce(
        (previous, current, idx) => ({
          ...previous,
          [idx]: current.instruction,
        }),
        {}
      ),
    };
    const imageUploadData = new FormData();
    imageUploadData.append("file", formResult.photo[0]);

    //@TODO: make this an env
    imageUploadData.append("upload_preset", "xw6p5o5v");

    const response = await fetch(cloudinaryURL, {
      method: "POST",
      body: imageUploadData,
    });
    const imageURL = await response.json();
    normalizedFormResult.photo = await imageURL.url;
  }
}

const RecipeFactory = () => {
  const methods = useForm();

  const Footer = () => {
    const { nextStep, previousStep, isLastStep, isFirstStep } = useWizard();

    const handleStepValidation = async () => {
      const isFormValid = await methods.trigger();
      isFormValid && nextStep();
    };

    return (
      <code>
        <>
          <button onClick={() => previousStep()} disabled={isFirstStep}>
            Previous
          </button>
          <button onClick={handleStepValidation} disabled={isLastStep}>
            Next
          </button>
        </>
      </code>
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
          footer={<Footer />}
          className={styles.create__wizard}
        >
          <Ingredients />
          <Instructions />
        </Wizard>
        <Button className={styles.btn__filled} type="submit">
          Save
        </Button>
      </form>
    </FormProvider>
  );
};

export default RecipeFactory;
