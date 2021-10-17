import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { ToggleButtonGroup, Button, ToggleButton, Form } from "react-bootstrap";

import styles from "./Instructions.module.css";

const cuisineOptions = ["Vegan", "Vegetarian", "Gluten Free", "Quick", "Kosher", "For Two", "Make Ahead"];

const Instructions = () => {
    const { register, control, formState: {errors}, defaultValues } = useFormContext();
    const {
        fields: instructionsFields,
        append: instructionsAppend,
        remove: instructionsRemove
    } = useFieldArray({control, name:"recipe.instructions"})
    return(
        <div className={styles.instructions__container}>
            <h2>Add the instructions:</h2>
                {instructionsFields.map((field, index) => (
                    <div key={field.id}>
                        <h3>{index+1}</h3>
                        <textarea {...register(`recipe.instructions.${index}.instruction`)} className={styles.instructions__inputArea} type="text" />
                        <Button onClick={() => instructionsRemove(index)}>Delete</Button>
                    </div>
                ))}
             <Button onClick={() => instructionsAppend(defaultValues.recipe.instructions[0])}className={styles.instructions__add}>Add New Instruction</Button>
                
                <div className={styles.instructions__categories}>
                    <Controller
                        control={control}
                        name="recipe.cuisine"
                        defaultValue={[]}
                        rules={{required:"At least one type of cuisine is needed"}}
                        render={({field: {onChange, value}}) =>
                        <ToggleButtonGroup 
                        className={styles.instructions__categories}
                        onChange={onChange}
                        type="checkbox"
                        value={value}
                        >
                            {cuisineOptions.map(option => <ToggleButton id={`cui-btn-${option}`} key={option} value={option}>{option}</ToggleButton>)}
                        </ToggleButtonGroup> 
                        }
                    /> 
                    {errors?.recipe?.cuisine && <span className={styles.instructions__error} role="alert">{errors.recipe.cuisine.message}</span>}        
                </div>
                
                <Controller
                    control={control}
                    name="recipe.thumbnail"
                    defaultvalue=""
                    rules={{required: "You must select a thumbnail"}}
                    render={({field: {onChange}}) => <input onChange={onChange} type="file" />} 
                />
                {errors?.recipe?.cuisine && <span className={styles.instructions__error} role="alert">{errors.recipe.thumbnail.message}</span>}

                <label htmlFor="recipe.public">make public?</label>
                <Controller
                    control={control}
                    name="recipe.public"
                    render={({field: {onChange}}) => <Form.Check onChange={onChange} type="switch" />}
                />
        </div>
    );
}

export default Instructions;