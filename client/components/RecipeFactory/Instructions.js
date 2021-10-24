import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { ToggleButtonGroup, Button, ToggleButton, Form } from "react-bootstrap";

import styles from "./RecipeFactory.module.css";

const cuisineOptions = [
  "Vegan",
  "Vegetarian",
  "Gluten Free",
  "Quick",
  "Kosher",
  "For Two",
  "Make Ahead",
];

const Instructions = () => {
  const {
    register,
    control,
    formState: { errors },
    defaultValues,
  } = useFormContext();
  const {
    fields: instructionsFields,
    append: instructionsAppend,
    remove: instructionsRemove,
  } = useFieldArray({ control, name: "instructions" });
  return (
    <div className={styles.instructions__step}>
      <section className={styles.create__instructions}>
        <h2>Add the instructions:</h2>
        {instructionsFields.map((field, index) => (
          <div key={field.id} className={styles.step__item}>
            <h3>{index + 1}</h3>

            <textarea
              {...register(`instructions.${index}.instruction`)}
              type="text"
            />

            <Button onClick={() => instructionsRemove(index)}>Delete</Button>
          </div>
        ))}
        <Button
          onClick={() => instructionsAppend(defaultValues.instructions[0])}
          className={styles.btn__filled}
        >
          Add New Instruction
        </Button>
      </section>

      <div className={styles.create__categories}>
        <h2>Cuisine categories:</h2>
        <Controller
          control={control}
          name="cuisine"
          defaultValue={[]}
          rules={{ required: "At least one type of cuisine is needed" }}
          render={({ field: { onChange, value } }) => (
            <ToggleButtonGroup
              onChange={onChange}
              type="checkbox"
              value={value}
            >
              {cuisineOptions.map((option) => (
                <ToggleButton
                  id={`cui-btn-${option}`}
                  key={option}
                  value={option}
                >
                  {option}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
        />
        {errors?.cuisine && <span role="alert">{errors.cuisine.message}</span>}
      </div>

      <h2>Add a photo</h2>
      <Controller
        control={control}
        name="photo"
        defaultvalue=""
        rules={{ required: "You must select a photo" }}
        render={({ field }) => (
          <input onChange={(e) => field.onChange(e.target.files)} type="file" />
        )}
      />
      {errors?.cuisine && <span role="alert"> {errors.cuisine.message}</span>}

      <div className={styles.create__photo}>
        <label htmlFor="public">Do you want your recipe to be private?</label>
        <Controller
          control={control}
          name="public"
          render={({ field: { onChange } }) => (
            <Form.Check inline={true} onChange={onChange} type="switch" />
          )}
        />
      </div>

      <div className={styles.create__comments}>
        <h2 htmlFor="comments">Recipe Details</h2>
        <p>
          Include any specific comments on what should be improved, added, etc.
          <b> (Optional):</b>{" "}
        </p>

        <textarea {...register("comments")} type="text" />
        <Button className={styles.btn__filled} type="submit">
          Save
        </Button>
      </div>
    </div>
  );
};

export default Instructions;
