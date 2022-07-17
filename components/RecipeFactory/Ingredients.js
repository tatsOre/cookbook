import {
  ToggleButtonGroup,
  Dropdown,
  DropdownButton,
  ToggleButton,
} from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import useSWR from "swr";
import { GET_CATEGORIES_URL } from "../../config";
import { getData } from "../../src/ApiCalls";

import styles from "./RecipeFactory.module.css";

const Ingredients = ({ fractionOptions, measurementOptions }) => {
  const fractionSelection = fractionOptions.map((option) => (
    <Dropdown.Item eventKey={option} key={option}>
      {option}
    </Dropdown.Item>
  ));

  const measurementSelection = measurementOptions.map((option) => (
    <Dropdown.Item eventKey={option} key={option}>
      {option}
    </Dropdown.Item>
  ));

  const {
    register,
    control,
    formState: { errors },
    defaultValues,
  } = useFormContext();

  const {
    fields: ingredientsFields,
    append: ingredientsAppend,
    remove: ingredientsRemove,
  } = useFieldArray({ control, name: "ingredients" });

  const { data: categoriesOptions, error } = useSWR(
    GET_CATEGORIES_URL,
    getData
  );
  if (!categoriesOptions) return null;

  return (
    <div className={styles.ingredients__step}>
      <div className={styles.form__section}>
        <h2 htmlFor="title">Recipe Title</h2>
        <p>Add a short, descriptive headline</p>
        <input
          {...register("title", { required: "A title is required" })}
          type="text"
          maxLength="50"
        />
        {errors?.title && <span role="alert">{errors?.title.message}</span>}
      </div>

      <div className={styles.form__section}>
        <h2 htmlFor="Description">Add a description</h2>
        <textarea
          maxLength="370"
          {...register("description", {
            required: "A description is required",
          })}
        />
        {errors?.description && (
          <span role="alert">{errors?.description.message}</span>
        )}
      </div>

      <div className={styles.form__section}>
        <label>
          Recipe for{" "}
          <input
            {...register("servings", {
              required: "Number of servings is required",
            })}
            min="1"
            type="number"
          />{" "}
          servings
        </label>
        {errors?.servings && (
          <span role="alert">{errors?.servings.message}</span>
        )}
      </div>

      <div className={styles.create__categories}>
        <h2>Category:</h2>
        <p>Choose a category for your recipe</p>
        <Controller
          control={control}
          name="categories"
          rules={{ required: "At least one category is needed" }}
          render={({ field: { onChange, value } }) => (
            <ToggleButtonGroup
              onChange={onChange}
              type="checkbox"
              value={value}
            >
              {categoriesOptions.map((option) => (
                <ToggleButton
                  variant="secondary"
                  id={`cat-btn-${option}`}
                  key={option}
                  value={option}
                >
                  {option}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
        />
        {errors?.categories && (
          <span role="alert">{errors?.categories.message}</span>
        )}
      </div>

      <div className={styles.create__ingredients}>
        <h2>Add the ingredients:</h2>
        <ul className={styles.ingredients__list}>
          {ingredientsFields.map((item, index) => (
            <li key={item.id} className={styles.ingredients__item}>
              <input
                {...register(`ingredients.${index}.unit`, {
                  required: "At least one ingredient is required",
                })}
                type="number"
              />
              <Controller
                control={control}
                name={`ingredients.${index}.fraction`}
                render={({ field: { onChange, value } }) => (
                  <DropdownButton
                    variant="secondary"
                    className={styles.ingredients__dropdown}
                    title={value}
                    onSelect={onChange}
                  >
                    {fractionSelection}
                  </DropdownButton>
                )}
              />
              <Controller
                control={control}
                name={`ingredients.${index}.measurement`}
                render={({ field: { onChange, value } }) => (
                  <DropdownButton
                    variant="secondary"
                    className={styles.ingredients__dropdown}
                    title={value}
                    onSelect={onChange}
                  >
                    {measurementSelection}
                  </DropdownButton>
                )}
              />

              <input
                {...register(`ingredients.${index}.name`, {
                  required: "ingredient name is required",
                })}
                type="text"
              />

              <CloseButton onClick={() => ingredientsRemove(index)} />
            </li>
          ))}
        </ul>
        <button
          onClick={() => ingredientsAppend(defaultValues.ingredients[0])}
          className={styles.btn__filled}
        >
          Add New Ingredient
        </button>
        {errors?.ingredients && (
          <span role="alert">Add at least one ingredient</span>
        )}
      </div>
    </div>
  );
};

export default Ingredients;
