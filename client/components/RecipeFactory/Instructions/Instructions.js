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
    } = useFieldArray({control, name:"instructions"})
    return(
        <div className={styles.instructions__container}>
            <h2>Add the instructions:</h2>
                {instructionsFields.map((field, index) => (
                    <div key={field.id}>
                        <h3>{index+1}</h3>
                        <textarea {...register(`instructions.${index}.instruction`)} className={styles.instructions__inputArea} type="text" />
                        <Button onClick={() => instructionsRemove(index)}>Delete</Button>
                    </div>
                ))}
             <Button onClick={() => instructionsAppend(defaultValues.instructions[0])}className={styles.instructions__add}>Add New Instruction</Button>
                
                <div className={styles.instructions__categories}>
                    <Controller
                        control={control}
                        name="cuisine"
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
                    {errors?.cuisine && <span className={styles.instructions__error} role="alert">{errors.cuisine.message}</span>}        
                </div>
                
                <Controller
                    control={control}
                    name="photo"
                    defaultvalue=""
                    rules={{required: "You must select a photo"}}
                    render={({field: {onChange}}) => <input onChange={onChange} type="file" />} 
                />
                {errors?.cuisine && <span className={styles.instructions__error} role="alert">{errors.cuisine.message}</span>}

                <label htmlFor="public">make public?</label>
                <Controller
                    control={control}
                    name="public"
                    render={({field: {onChange}}) => <Form.Check onChange={onChange} type="switch" />}
                />
                <label htmlFor="comments">Add additional comments</label>
                <textarea {...register("comments")} className={styles.instructions__inputArea} type="text" />
        </div>
    );
}

export default Instructions;