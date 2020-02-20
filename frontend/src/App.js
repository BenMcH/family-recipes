import React, {useState, useEffect} from 'react';
import './App.css';

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1337/recipes').then(response => response.json()).then(json => setRecipes(json));
  }, []);

  return recipes;
}

const Recipe = ({recipe}) => (
<div>
  <h2>{recipe.name}</h2>
  {recipe.mealMedia.length && <img src={`http://localhost:1337/${recipe.mealMedia[0].url}`} alt={'Recipe cover image'} />}
  <p>{recipe.description}</p>
  <h3>Ingredients</h3>
  <ul>
    {recipe.ingredients.map((ingredent) => <li>{ingredent.name} - {ingredent.quantity}</li>)}
  </ul>
  <h3>Instructions</h3>
  <ol>
    {recipe.instructions.split('\n').map((instruction) => <li>{instruction}</li>)}
  </ol>
</div>
)

const App = () => {
  const recipes = useRecipes();

  return (
    <div>
      <h1>Recipes ({recipes.length})</h1>

      <div id="container">
        {recipes.map((recipe) => <Recipe recipe={recipe} />)}
      </div>

    </div>
  )
}

export default App;