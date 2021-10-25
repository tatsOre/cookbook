import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import { FormProvider, useForm } from "react-hook-form";
import { Wizard, useWizard } from "react-use-wizard";
import { RECIPE_BASE_URL } from "../../config.js";
import { fetchAPI, getData } from "../../src/ApiCalls";
import { useRouter } from "next/router";
import useSWR, {mutate} from "swr";
import { useEffect } from "react";

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

let defaultValues = {
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

function normalizeFormData(data) { 
  return {
    ...data,
    ingredients: data.ingredients.map(ingredient => {
      ingredient.fraction = ingredient.fraction === "0" ? "" : ingredient.fraction;
      ingredient.measurement = ingredient.measurement === "None" ? "" : ingredient.fraction;
      return ingredient;
    }),
    instructions: data.instructions.reduce(
      (previous, current, idx) => ({
        ...previous,
        [idx]: current.instruction,
      }),
    ),
  };
}

function deNormalizeFormData(data) { 
  return {
    ...data,
    ingredients: data.ingredients.map(ingredient => {
      ingredient.fraction = ingredient.fraction === "" ? "0" : ingredient.fraction;
      ingredient.measurement = ingredient.measurement === "" ? "None" : ingredient.fraction;
      return ingredient;
    }),
    instructions: Object.values(data.instructions).map((inst) => {return {instruction: inst}})
  };
}

async function onFormSubmit(formResult) {
  console.log(formResult);
  if (formResult.photo.length > 0) {
    const normalizedFormResult = normalizeFormData(formResult);

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

const RecipeFactory = (props) => {
  const methods = useForm({
    defaultValues: defaultValues,
  });

  const {data: recipeData} = props.mode === "edit" && useSWR(`${RECIPE_BASE_URL}/${props.recipeID}`, getData);
  const deNormalizedData = recipeData ? deNormalizeFormData(recipeData) : recipeData;
  console.log("first", recipeData)
  console.log("second", deNormalizedData);
  //@TODO need to better solve this: https://github.com/react-hook-form/react-hook-form/issues/2492#issuecomment-771578524
  useEffect(() => {
    if (!recipeData) {
      return;
    }
    methods.reset({
      ...methods.getValues(),
      ...deNormalizeFormData(recipeData)
    });
  }, [methods.reset, recipeData, methods.getValues]);

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
          <Ingredients />
          <Instructions />
        </Wizard>
      </form>
    </FormProvider>
  );
};

export default RecipeFactory;
