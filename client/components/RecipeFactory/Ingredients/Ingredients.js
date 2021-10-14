
import { ToggleButtonGroup, Button, Dropdown, DropdownButton, ToggleButton, Form } from "react-bootstrap";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Wizard, useWizard } from "react-use-wizard";

import styles from "./Ingredients.module.css";



const Footer = () => {
    const {
      nextStep,
      previousStep,
      isLastStep,
      isFirstStep,
    } = useWizard();
  
    return (
      <code>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => previousStep()}
            disabled={isFirstStep}
          >
            Previous
          </button>
          <button onClick={() => nextStep()} disabled={isLastStep}>
            Next
          </button>
        </div>
      </code>
    );
  };

const Ingredients = () => {

    /* TODO: Grab this data from the API*/
    const fractionOptions= ["0", "1/8", "1/4", "1/3", "1/2", "2/3", "3/4"]
    const measurementOptions = ["Teaspoon", "Tablespoon", "Cup", "Gallon", "Grams", "Kilograms", "Ounces", "Litres", "None"];
    const categoriesOptions = ["Lunch", "Dinner", "Dessert", "Appetizer", "Beverage", "Miscellaneous"];
    const cuisineOptions = ["Vegan", "Vegetarian", "Gluten Free", "Quick", "Kosher", "For Two", "Make Ahead"];
    const cloudinaryURL = "https://api.cloudinary.com/v1_1/dshl3pgv4/upload"


    const defaultValues = {
        recipe: {
            title: "",
            description: "",
            ingredients: [
                {fraction: fractionOptions[0], unit: "1", measurement: measurementOptions[0]}
            ],
            instructions: [""]
        }
    }


    const { register, handleSubmit, control } = useForm({
        defaultValues: {...defaultValues}
    });
    const fractionSelection = fractionOptions.map((option) => 
        <Dropdown.Item eventKey={option} key={option}>{option}</Dropdown.Item>
    );

    const measurementSelection = measurementOptions.map((option) => 
        <Dropdown.Item eventKey={option} key={option}>{option}</Dropdown.Item>
    );

    const {
        fields: ingredientsFields, 
        append: ingredientsAppend,
        remove: ingredientsRemove
    } = useFieldArray({control, name: "recipe.ingredients"});

    const {
        fields: instructionsFields,
        append: instructionsAppend,
        remove: instructionsRemove
    } = useFieldArray({control, name:"recipe.instructions"})

    async function onFormSubmit(formResult) {
        console.log(formResult);

        if(FormResult.recipe.thumbnail.length > 0) {
            const imageUploadData = new FormData();
            imageUploadData.append("file", formResult.recipe.thumbnail[0]);


            //@TODO: make this an env
            imageUploadData.append("upload_preset", "xw6p5o5v");

            const response = await fetch(cloudinaryURL, {
                method: "POST",
                body: imageUploadData
            });
            const imageURL = await response.json();
            formResult.recipe.thumbnail = await imageURL.url;
        }
    };

    const IngredientsStep = () => {
        return (
        <div className={styles.ingredients__container}>
            <h2>Create your New Recipe!</h2>

            <form>
                <label htmlFor="title">Title for your recipe</label>
                <input {...register("recipe.title")} className={styles.ingredients__input} type="text" />

                <label htmlFor="Description">Description</label>
                <textarea {...register("recipe.description")} className={styles.ingredients__inputArea} type="text" />

                <label>Recipe for <input {...register("recipe.servings")} className={styles.ingredients__inputNumber} type="number" /> sevings</label>

                <div className={styles.ingredients__categories}>
                <Controller
                    control={control}
                    name="recipe.categories"
                    defaultValue={[]}
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
                </div>

                <section className={styles.ingredients__addIngredient}>
                <h2>Add the ingredients:</h2>

                <ul className={styles.ingredients__list}>
                    {ingredientsFields.map((item, index) => (
                        <li key={item.id}>
                            <input {...register(`recipe.ingredients.${index}.unit`)} className={styles.ingredients__inputUnit} type="number" />
                            <Controller 
                                control={control}
                                name={`recipe.ingredients.${index}.fraction`}
                                defaultValue={fractionOptions[0]}
                                render={({field: {onChange, value}}) => 
                                <DropdownButton
                                className={styles.ingredients__dropdown} 
                                title={value}
                                onSelect={onChange}
                                > 
                                    {fractionSelection}
                                </DropdownButton>
                                }
                            />      
            
                            <Controller 
                                control={control}
                                name={`recipe.ingredients.${index}.measurement`}
                                defaultValue={measurementOptions[0]}
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
                                <input  {...register(`recipe.ingredients.${index}.name`)} className={styles.ingredients__inputIngredient} type="text" />
                                <Button onClick={() => ingredientsRemove(index)}>Delete</Button>
                        </li>
                    ))}
                </ul>
                <Button onClick={() => ingredientsAppend(defaultValues.recipe.ingredients[0])}className={styles.ingredients__add}>Add New Ingredient</Button>
                </section>
            </form>
        </div>
        )
    }

    const InstructionsStep = () => {
        return(
            <div className={styles.ingredients__container}>
                <h2>Add the instructions:</h2>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    {instructionsFields.map((field, index) => (
                        <div key={field.id}>
                            <h3>{index+1}</h3>
                            <textarea {...register(`recipe.instructions.${index}.instruction`)} className={styles.ingredients__inputArea} type="text" />
                            <Button onClick={() => instructionsRemove(index)}>Delete</Button>
                        </div>
                    ))}
                    <Button onClick={() => instructionsAppend("")}>Add Instruction</Button>
                    
                    <div className={styles.ingredients__categories}>
                        <Controller
                            control={control}
                            name="recipe.cuisine"
                            defaultValue={[]}
                            render={({field: {onChange, value}}) =>
                            <ToggleButtonGroup 
                            className={styles.ingredients__categories}
                            onChange={onChange}
                            type="checkbox"
                            value={value}
                            >
                                {cuisineOptions.map(option => <ToggleButton id={`cui-btn-${option}`} key={option} value={option}>{option}</ToggleButton>)}
                            </ToggleButtonGroup> 
                            }
                        />          
                    </div>
                    <Button type="submit">Save</Button>

                    <input type="file" {...register(`recipe.thumbnail`)}/>
                    <label htmlFor="recipe.public">make public?</label>
                    <Controller
                        control={control}
                        name="recipe.public"
                        render={({field: {ref, value, onChange}}) => <Form.Check onChange={onChange} type="switch" />}
                    />
                </form>
            </div>
        );
    }

    return (
        <Wizard startIndex={1} footer={<Footer />}>
            <IngredientsStep number={1} />
            <InstructionsStep number={2} />
        </Wizard> 
  );
};

export default Ingredients;