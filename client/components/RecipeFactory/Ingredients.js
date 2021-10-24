import {
  ToggleButtonGroup,
  Button,
  Dropdown,
  DropdownButton,
  ToggleButton,
} from "react-bootstrap";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import styles from "./RecipeFactory.module.css";

const Ingredients = () => {
  /* TODO: Grab this data from the API*/
  const fractionOptions = ["0", "1/8", "1/4", "1/3", "1/2", "2/3", "3/4"];
  const measurementOptions = [
    "Teaspoon",
    "Tablespoon",
    "Cup",
    "Gallon",
    "Gram",
    "Pound",
    "Kilogram",
    "Ounce",
    "Litre",
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

  return (
    <div className={styles.ingredients__step}>
      <h1 className={styles.form__title}>Create New Recipe</h1>

      <h2 htmlFor="title">Recipe Title</h2>

      <p>Add a short, descriptive headline</p>
      <input
        {...register("title", { required: "A title is required" })}
        type="text"
      />
      {errors?.title && <span role="alert">{errors?.title.message}</span>}

      <h2 htmlFor="Description">Add a description</h2>
      <textarea
        {...register("description", { required: "A description is required" })}
      />
      {errors?.description && (
        <span role="alert">{errors?.description.message}</span>
      )}

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
      {errors?.servings && <span role="alert">{errors?.servings.message}</span>}

      <div className={styles.create__categories}>
        <h2>Category:</h2>
        <p>Choose a category for your recipe</p>
        <Controller
          control={control}
          name="categories"
          defaultValue={[]}
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

      <section className={styles.create__ingredients}>
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
                rules={{ required: "At least one ingredient is needed" }}
                defaultValue={fractionOptions[0]}
                render={({ field: { onChange, value } }) => (
                  <DropdownButton
                    variant="secondary"
                    className={styles.ingredients__dropdown}
                    title={value}
                    onSelect={onChange}
                    rules={{ required: true }}
                  >
                    {fractionSelection}
                  </DropdownButton>
                )}
              />
              <Controller
                control={control}
                name={`ingredients.${index}.measurement`}
                defaultValue={measurementOptions[0]}
                rules={{ required: "A measurement is needed" }}
                render={({ field: { onChange, value } }) => (
                  <DropdownButton
                    variant="secondary"
                    className={styles.ingredients__dropdown}
                    onSelect={onChange}
                    title={value}
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
              <Button
                className={styles.btn__remove__ingredient}
                onClick={() => ingredientsRemove(index)}
              >
                D
              </Button>
            </li>
          ))}
        </ul>
        <Button
          onClick={() => ingredientsAppend(defaultValues.ingredients[0])}
          className={styles.btn__filled}
        >
          Add New Ingredient
        </Button>
        {errors?.ingredients && (
          <span role="alert">Add at least one ingredient</span>
        )}
      </section>
    </div>
  );
};

export default Ingredients;
