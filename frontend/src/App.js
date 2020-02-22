import React, {useState, useEffect} from 'react';
import {Card, CardContent, Collapse, CardActions, IconButton} from '@material-ui/core';
import './App.css';

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1337/recipes').then(response => response.json()).then(json => {
      setRecipes(json);
    });
  }, []);

  return recipes;
}

const Recipe = ({recipe}) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <Card variant="outlined">
      <CardContent>
        <h2>{recipe.name}</h2>
        {recipe.mealMedia.length && <img src={`http://localhost:1337/${recipe.mealMedia[0].url}`} alt={'Recipe cover image'} />}
        <p>{recipe.description}</p>
        <CardActions disableSpacing style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
          <IconButton
            onClick={toggle}
            aria-expanded={open}
            aria-label="show details"
          >
            {open ? '-' : '+'}
          </IconButton>
        </CardActions>
        <Collapse in={open}>
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredent) => <li>{ingredent.name} - {ingredent.quantity}</li>)}
          </ul>
          <h3>Instructions</h3>
          <ol>
            {recipe.instructions.map((instruction) => <li>{instruction.text}</li>)}
          </ol>
        </Collapse>
      </CardContent>
    </Card>
  );
}

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