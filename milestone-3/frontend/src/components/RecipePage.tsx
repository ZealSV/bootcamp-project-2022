import React, { ChangeEvent, useEffect, useState } from 'react';
import "./RecipePreview.css";
import recipes, {Recipe} from '../recipeData';
import RecipePreview from "./RecipePreview";
import { useParams } from "react-router-dom";
import foodPic1 from "./images/Instant-Pot-Chicken-Marinara-with-Polenta-12.jpeg"
import foodPic2 from "./images/Broccoli-Pesto-Pasta-7.jpeg"
import foodPic3 from "./images/Lemon-Chicken-7.jpeg"

interface RecipePageProps {
  external?: boolean;
	// other props
}
function RecipePage(props: RecipePageProps) {
  let { id } = useParams();
  

  const[recipe, setRecipe] = useState<Recipe>({
    name: "",
    description: "",
    image: "",
    ingredients: [],
    instructions: []
  })
  const [newIngredient, setNewIngredient] = useState('');//add this
  const [newStep, setNewStep] = useState('');//add this
  
  const [allIngredients, setAllIngredients] = useState([]);
  const [allSteps, setAllSteps] = useState([]);

  useEffect(() => {
    setAllIngredients([]);
    setAllSteps([]);
    console.log(recipe.ingredients)
    console.log(recipe.instructions)
}, [recipe]);

  
  useEffect(() => {
    // make an API call with the url param & setRecipe
    // http://localhost:3001/recipe/
    // https://bootcamp-milestone-4.onrender.com/recipe/
    console.log(id)
    fetch("http://localhost:3001/recipe/" + id)
          .then((res) => res.json())
          .then((data) => {
            setRecipe(data[0])
          })
    
  }, [id]);

 

  async function addIngredient(ingredient: string) {
    await fetch(`http://localhost:3001/recipe/${id}/ingredient`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({"newIngredient": ingredient})});
    fetch(`http://localhost:3001/recipe/${id}`)
    .then((res) => (res.json()))
    .then((data) => {
        setAllIngredients(data.ingredients)})
  };

  async function addInstruction(instruction: string) {
    await fetch(`http://localhost:3001/recipe/${id}/instruction`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({"newInstruction": instruction})});
    fetch(`http://localhost:3001/recipe/${id}`)
    .then((res) => (res.json()))
    .then((data) => {
      setAllSteps(data.instructions)})
  };
  
  return(
    <div>
        <div className = "flex-container">
            <div>
                <img className="flex-image" src={recipe.image}/>
            </div>
            <div className= "flex-content">
                <h1>{recipe.name}</h1>
                <p>{recipe.description}</p>
                {/* Ingredients */}
                <h2 className="colorizehoverize">Ingredients</h2>
                {allIngredients.map(ingredient =>
                    <li>{ingredient}</li>)}
            </div>   
        </div>
        <h2 className="colorizehoverize">Preparation</h2>
        <ol>
            {/* Instructions */}
            {allSteps.map(instruction =>
                <li>{instruction}</li>)}
        </ol>
        <input
          placeholder="2 cups of spinach"
          value={newIngredient} // add newIngredient as the input's value
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            // this event handler updates the value of newIngredient
            setNewIngredient(e.target.value);
          }}
        />
        <button onClick={() => addIngredient(newIngredient)}>
        Add Ingredient
      </button>
        <br></br>
        <input
          placeholder="Turn on the stove"
          value={newStep} // add newIngredient as the input's value
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            // this event handler updates the value of newIngredient
            setNewStep(e.target.value);
          }}
        />
      
      <button onClick={()=>addInstruction(newStep)}>
        Add Step
      </button>
        </div>
    )
  }

  RecipePage.defaultProps = {
    external: false,
  };

export default RecipePage