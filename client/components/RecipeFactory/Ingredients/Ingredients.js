import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import { useForm, Controller, useFieldArray } from 'react-hook-form';

import styles from "./Ingredients.module.css";


const Ingredients = () => {

    const fractionOptions= ["0", "1/8", "1/4", "1/3", "1/2", "2/3", "3/4"]
    const measurementOptions = ["Teaspoon", "Tablespoon", "Cup", "Gallon", "Grams", "Kilograms", "Ounces", "Litres", "None"];
    const defaultIngredientValues= {
        recipe: {
            title: "",
            description: "",
            ingredients: [
                {fraction: fractionOptions[0], unit: "1", measurement: measurementOptions[0]}
            ],
        }
    }

    const { register, handleSubmit, control } = useForm({
        defaultValues: {...defaultIngredientValues}
    });
    const fractionSelection = fractionOptions.map((option) => 
        <Dropdown.Item eventKey={option} key={option}>{option}</Dropdown.Item>
    );

    const measurementSelection = measurementOptions.map((option) => 
        <Dropdown.Item eventKey={option} key={option}>{option}</Dropdown.Item>
    );

    const {fields, append, remove} = useFieldArray({
        control,
        name: "recipe.ingredients"
    });

    return (
        <div className={styles.ingredients__container}>
            <h1>Create your New Recipe!</h1>

            <form onSubmit={handleSubmit(data => console.log(data))}>
                <label htmlFor="title">Title for your recipe</label>
                <input {...register("recipe.title")} className={styles.ingredients__input} type="text" />

                <label htmlFor="Description">Description</label>
                <textarea {...register("recipe.description")} className={styles.ingredients__inputArea} type="text" />

                <label>Recipe for <input className={styles.ingredients__inputNumber} type="number" /> sevings</label>

                <div className={styles.ingredients__categories}>
                    <Badge>Breakfast</Badge>
                    <Badge>Lunch</Badge>
                    <Badge>Dinner</Badge>
                    <Badge>Dessert</Badge>
                    <Badge>Appetizer</Badge>
                    <Badge>Beverage</Badge>
                    <Badge>Miscellaneous</Badge>                   
                </div>

                <section className={styles.ingredients__addIngredient}>
                <h2>Add the ingredients:</h2>

                <ul className={styles.ingredients__list}>
                    {fields.map((item, index) => (
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
                                <Button onClick={() => remove(index)}>Delete</Button>
                        </li>
                    ))}
                </ul>
                <Button onClick={() => append(defaultIngredientValues.recipe.ingredients[0])}className={styles.ingredients__add}>Add New Ingredient</Button>
                </section>
                <Button type="submit" >Save</Button>
            </form>
        </div>
  );
};

export default Ingredients;
