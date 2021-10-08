import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Badge } from "react-bootstrap";


const Ingredients = () => {


    return (
        <>
            <h1>Create your New Recipe!</h1>
            <form>
                <label htmlFor="recipeTitle">title for your recipe</label>
                <input type="text" name="recipeTitle" />

                <label htmlFor="Description">Description</label>
                <textarea type="text" name="Description" />

                <label>Recipe for <input type="number" /> sevings</label>

                <div>
                    <Badge>Breakfast</Badge>
                    <Badge>Lunch</Badge>
                    <Badge>Dinner</Badge>
                    <Badge>Dessert</Badge>
                    <Badge>Appetizer</Badge>
                    <Badge>Beverage</Badge>
                    <Badge>Miscellaneous</Badge>                    
                </div>

                <h2>Add the ingredients:</h2>
                
                <input type="number" />
                <DropdownButton title="Select fraction">
                    <Dropdown.Item>0</Dropdown.Item>
                    <Dropdown.Item>1/8</Dropdown.Item>
                    <Dropdown.Item>1/4</Dropdown.Item>
                    <Dropdown.Item>1/3</Dropdown.Item>
                    <Dropdown.Item>1/2</Dropdown.Item>
                    <Dropdown.Item>2/3</Dropdown.Item>
                    <Dropdown.Item>3/4</Dropdown.Item>
                </DropdownButton>

                <DropdownButton title="Select measure">
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

                <Button>Add New Ingredient</Button>
                <Button>Save</Button>
            </form>
        </>
  );
};

export default Ingredients;
