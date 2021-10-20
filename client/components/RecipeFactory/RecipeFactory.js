import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import { Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { Wizard, useWizard } from "react-use-wizard";
import { RECIPE_BASE_URL } from "../../config.js";
import { fetchAPI } from "../../src/ApiCalls";


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
  console.log(formResult); 
  if (formResult.photo.length > 0) {
    const normalizedFormResult = {
      ...formResult,
      ingredients: formResult.ingredients.map(ingredient => {
        ingredient.fraction = ingredient.fraction === "0" ? "" : ingredient.fraction;
        ingredient.measurement = ingredient.measurement === "None" ? "" : ingredient.fraction;
      }),
      instructions: formResult.instructions.reduce(
        (previous, current, idx) => ({
          ...previous,
          [idx]: current.instruction,
        }),
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

    const response = await fetchAPI("POST", RECIPE_BASE_URL, normalizedFormResult);
    if (response.status !== 200) {
      const content = await response.json();
      setWarning({
        show: true,
        messages: content.message,
      });
      return setDisabled(false);
    }
  }
}

const RecipeFactory = () => {

  const methods = useForm({
    defaultValues: defaultValues
  });

  const Footer = () => {
    const { nextStep, previousStep, isLastStep, isFirstStep } = useWizard();

    const handleStepValidation = async () => {
      const isFormValid = await methods.trigger();
      isFormValid && nextStep();
    };

    return (
      <code>
        <>
          <button className={styles.btn__filled} onClick={() => previousStep()} disabled={isFirstStep}>
            Previous
          </button>
          <button className={styles.btn__filled} onClick={handleStepValidation} disabled={isLastStep}>
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
      </form>
    </FormProvider>
  );
};

export default RecipeFactory;
