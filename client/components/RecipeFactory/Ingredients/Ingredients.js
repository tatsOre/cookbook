
import { ToggleButtonGroup, Button, Dropdown, DropdownButton, ToggleButton } from "react-bootstrap";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import styles from "./Ingredients.module.css";

const Ingredients = () => {

    /* TODO: Grab this data from the API*/
    const fractionOptions= ["0", "1/8", "1/4", "1/3", "1/2", "2/3", "3/4"]
    const measurementOptions = ["Teaspoon", "Tablespoon", "Cup", "Gallon", "Grams", "Kilograms", "Ounces", "Litres", "None"];
    const categoriesOptions = ["Lunch", "Dinner", "Dessert", "Appetizer", "Beverage", "Miscellaneous"];
    

    const fractionSelection = fractionOptions.map((option) => 
        <Dropdown.Item eventKey={option} key={option}>{option}</Dropdown.Item>
    );

    const measurementSelection = measurementOptions.map((option) => 
        <Dropdown.Item eventKey={option} key={option}>{option}</Dropdown.Item>
    );

    const { register, control, formState: { errors }, defaultValues } = useFormContext();

    const {
        fields: ingredientsFields, 
        append: ingredientsAppend,
        remove: ingredientsRemove
    } = useFieldArray({control, name: "ingredients"});

    return (
        <div className={styles.ingredients__container}>
            <h2>Create your New Recipe!</h2>
                <label htmlFor="title">Title for your recipe</label>
                <input {...register("title", {required: "Title is needed"})} className={styles.ingredients__input} type="text" />
                {errors?.title && <span className={styles.ingredients__error} role="alert">{errors?.title.message}</span>}

                <label htmlFor="Description">Description</label>
                <textarea {...register("description", {required: "A description is required"})} className={styles.ingredients__inputArea} type="text" />
                {errors?.description && <span className={styles.ingredients__error} role="alert">{errors?.description.message}</span>}

                <label>Recipe for <input {...register("servings", {required: "Number of servings is required"})} className={styles.ingredients__inputNumber} type="number" /> sevings</label>
                {errors?.servings && <span className={styles.ingredients__error} role="alert">{errors?.servings.message}</span>}

                <div className={styles.ingredients__categories}>
                <Controller
                    control={control}
                    name="categories"
                    defaultValue={[]}
                    rules={{required:"At least one category is needed"}}
                    render={({field: {onChange, value}}) =>
                    <ToggleButtonGroup 
                    className={styles.ingredients__categories}
                    onChange={onChange}
                    type="checkbox"
                    value={value}
                    >
                        {categoriesOptions.map(option => <ToggleButton id={`cat-btn-${option}`} key={option} value={option}>{option}</ToggleButton>)}
                    </ToggleButtonGroup> 
                    }
                />
                {errors?.categories && <span className={styles.ingredients__error} role="alert">{errors?.categories.message}</span>}          
                </div>

                <section className={styles.ingredients__addIngredient}>
                <h2>Add the ingredients:</h2>

                <ul className={styles.ingredients__list}>
                    {ingredientsFields.map((item, index) => (
                        <li key={item.id}>
                            <input {...register(`ingredients.${index}.unit`, {required: "At least one ingredient is required"})} className={styles.ingredients__inputUnit} type="number" />
                            <Controller 
                                control={control}
                                name={`ingredients.${index}.fraction`}
                                rules={{required:"At least one ingredient is needed"}}
                                defaultValue={fractionOptions[0]}
                                render={({field: {onChange, value}}) => 
                                <DropdownButton
                                className={styles.ingredients__dropdown} 
                                title={value}
                                onSelect={onChange}
                                rules={{required: true}}
                                > 
                                    {fractionSelection}
                                </DropdownButton>
                                }
                            />      
                            <Controller 
                                control={control}
                                name={`ingredients.${index}.measurement`}
                                defaultValue={measurementOptions[0]}
                                rules={{required:"A measurement is needed"}}
                                render={({field: {onChange, value}}) => 
                                <DropdownButton
                                className={styles.ingredients__dropdown} 
                                onSelect={onChange}
                                title={value}
                                > 
                                    {measurementSelection}
                                </DropdownButton>
                                }
                            />
                                <input  {...register(`ingredients.${index}.name`, {required: "ingredient name is required"})} className={styles.ingredients__inputIngredient} type="text" />
                                <Button onClick={() => ingredientsRemove(index)}>Delete</Button>
                        </li>
                    ))}
                </ul>
                <Button onClick={() => ingredientsAppend(defaultValues.ingredients[0])}className={styles.ingredients__add}>Add New Ingredient</Button>
                {errors?.ingredients && <span className={styles.ingredients__error} role="alert">Add at least one ingredient</span>}
                </section>
        </div>
    )
};

export default Ingredients;