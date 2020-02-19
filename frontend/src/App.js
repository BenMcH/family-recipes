import React, {useState, useEffect} from 'react';
import './App.css';

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1337/recipes').then(response => response.json()).then(json => setRecipes(json));
  }, []);

  return recipes;
}

const App = () => {
  const recipes = useRecipes();

  return (
    <div>
      <h2>Recipes ({recipes.length})</h2>

      <ul>
        {recipes.map((recipe) => <li>{recipe.Name}</li>)}
      </ul>

    </div>
  )
}

export default App;