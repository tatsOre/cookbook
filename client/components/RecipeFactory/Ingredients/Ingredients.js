import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Badge } from "react-bootstrap";

import styles from "./Ingredients.module.css";


const Ingredients = () => {


    return (
        <div className={styles.ingredients__container}>
            <h1>Create your New Recipe!</h1>
            <form>
                <label htmlFor="recipeTitle">Title for your recipe</label>
                <input className={styles.ingredients__input} type="text" name="recipeTitle" />

                <label htmlFor="Description">Description</label>
                <textarea className={styles.ingredients__inputArea} type="text" name="Description" />

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
                
                <input className={styles.ingredients__inputUnit} type="number" />
                    <DropdownButton className={styles.ingredients__dropdown} title="1/2">
                        <Dropdown.Item>0</Dropdown.Item>
                        <Dropdown.Item>1/8</Dropdown.Item>
                        <Dropdown.Item>1/4</Dropdown.Item>
                        <Dropdown.Item>1/3</Dropdown.Item>
                        <Dropdown.Item>1/2</Dropdown.Item>
                        <Dropdown.Item>2/3</Dropdown.Item>
                        <Dropdown.Item>3/4</Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton className={styles.ingredients__dropdown} title="Cup">
                        <Dropdown.Item>teaspoon</Dropdown.Item>
                        <Dropdown.Item>tablespoon</Dropdown.Item>
                        <Dropdown.Item>cup</Dropdown.Item>
                        <Dropdown.Item>gallon</Dropdown.Item>
                        <Dropdown.Item>grams</Dropdown.Item>
                        <Dropdown.Item>kilograms</Dropdown.Item>
                        <Dropdown.Item>Ounces</Dropdown.Item>
                        <Dropdown.Item>Litre</Dropdown.Item>
                        <Dropdown.Item>None</Dropdown.Item>
                    </DropdownButton>
                    <input className={styles.ingredients__inputIngredient} type="text" />
                    <Button >D</Button>
                    <Button className={styles.ingredients__add}>Add New Ingredient</Button>
                </section>
                <Button>Save</Button>
            </form>
        </div>
  );
};

export default Ingredients;
