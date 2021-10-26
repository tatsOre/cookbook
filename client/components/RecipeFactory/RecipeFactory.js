import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Wizard } from "react-use-wizard";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import WizardControls from "./WizardControls";
import useSWR from "swr";
import { useRouter } from "next/router";
import {
  CLOUDINARY_URL,
  GET_FRACTIONS_URL,
  GET_MEASUREMENT_URL,
  RECIPE_BASE_URL,
} from "../../config.js";
import { fetchAPI, getData } from "../../src/ApiCalls";

import styles from "./RecipeFactory.module.css";

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

const RecipeFactory = (props) => {
  const router = useRouter();
  const defaultValues = {
    instructions: [""],
    photo: "",
    ingredients: [
      {
        fraction: "0",
        unit: "1",
        measurement: "none",
      },
    ],
  };

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const {data: recipeData} = props.mode === "edit" && useSWR(`${RECIPE_BASE_URL}/${props.recipeID}`, getData);

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

  const { data: fractionData, error: fractionError } = useSWR(
    GET_FRACTIONS_URL,
    getData
  );

  const { data: measurementData, error: measurementError } = useSWR(
    GET_MEASUREMENT_URL,
    getData
  );

  if (!fractionData && !fractionError) return null;
  if (!measurementData && !measurementError) return null;

  const fractionOptions = fractionData || [];
  const measurementOptions = measurementData || [];

  async function onFormSubmit(formResult) {
    
    if (formResult.photo.length > 0) {
      const normalizedFormResult = normalizeFormData(formResult);
      console.log(normalizedFormResult);
      const imageUploadData = new FormData();

      imageUploadData.append("file", formResult.photo[0]);

      //@TODO: make this an env
      imageUploadData.append("upload_preset", "xw6p5o5v");

      const cloudinaryResponse = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: imageUploadData,
      });
      const imageURL = await cloudinaryResponse.json();
      normalizedFormResult.photo = await imageURL.url;

      const response = await fetchAPI(
        props.mode === "edit" ? "PATCH" :  "POST",
        props.mode === "edit" ? `${RECIPE_BASE_URL}/${props.recipeID}` : `${RECIPE_BASE_URL}`,
        normalizedFormResult
      );

      if (response.status !== 200) {
        console.log(response.statusText);
      } else {
        const result = await response.json();
        console.log(result);
        router.push(`/recipes/${result._id}`);
      }
    }
  }

  return (
    <FormProvider {...methods} defaultValues={defaultValues}>
      <form
        onSubmit={methods.handleSubmit(onFormSubmit, onError)}
        className={styles.create__form}
      >
        <Wizard
          startIndex={0}
          footer={<WizardControls methods={methods} />}
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
