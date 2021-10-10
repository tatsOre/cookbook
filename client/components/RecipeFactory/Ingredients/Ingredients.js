import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import { useForm, Controller } from 'react-hook-form';

import styles from "./Ingredients.module.css";


const Ingredients = () => {

    const { register, handleSubmit, control } = useForm();

    const fractionOptions= ["0", "1/8", "1/4", "1/3", "1/2", "2/3", "3/4"]
    const measurementOptions = ["Teaspoon", "Tablespoon", "Cup", "Gallon", "Grams", "Kilograms", "Ounces", "Litres", "None"];

    const fractionSelection = fractionOptions.map((option) => 
        <Dropdown.Item eventKey={option} key={option}>{option}</Dropdown.Item>
    );

    const measurementSelection = measurementOptions.map((option) => 
        <Dropdown.Item eventKey={option} key={option}>{option}</Dropdown.Item>
    );

    const [fractionDropdownState, setfractionDropdownState] = useState(fractionOptions[0]);
    const [measurementDropdownState, setMeasurementDropdownState] = useState(measurementOptions[0])

    const onSubmit = (data) => console.log("data", data);

    return (
        <div className={styles.ingredients__container}>
            <h1>Create your New Recipe!</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">Title for your recipe</label>
                <input {...register("ingredients.title")} className={styles.ingredients__input} type="text" />

                <label htmlFor="Description">Description</label>
                <textarea {...register("ingredients.description")} className={styles.ingredients__inputArea} type="text" />

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

                <input {...register(`ingredients.list[0].unit`)} className={styles.ingredients__inputUnit} type="number" />

                <Controller 
                    control={control}
                    name={`ingredients.list[0].fraction`}
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
                    name={`ingredients.list[0].measurement`}
                    defaultValue={measurementOptions[0]}
                    render={({field: {onChange, value}}) => 
                    <DropdownButton
                    className={styles.ingredients__dropdown} 
                    title={measurementDropdownState}
                    onSelect={onChange}
                    title={value}
                    > 
                        {measurementSelection}
                    </DropdownButton>
                    }
                />

                    <input  {...register("ingredients.list[0].name")} className={styles.ingredients__inputIngredient} type="text" />
                    <Button >D</Button>

                    <Button className={styles.ingredients__add}>Add New Ingredient</Button>
                </section>
                <Button type="submit" >Save</Button>
            </form>
        </div>
  );
};

export default Ingredients;
