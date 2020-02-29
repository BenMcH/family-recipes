import React, {useState} from 'react';
import {graphql} from 'gatsby';
import {Card, CardContent, CardActions, Button, Backdrop} from '@material-ui/core';
import '../static/recipes.css';

const Recipe = ({recipe}) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <Card variant="outlined">
      <CardContent>
        <h2>{recipe.name}</h2>
        {recipe.mealMedia.length
          && <img src={`http://localhost:1337/${recipe.mealMedia[0].url}`} alt={'Recipe cover image'} />}
        <p>{recipe.description}</p>
        <CardActions
          disableSpacing
          style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}
        >
          <Button
            color={'primary'}
            variant={'contained'}
            onClick={toggle}
          >
            View Recipe
          </Button>
        </CardActions>
        <Backdrop
          open={open}
          onClick={toggle}
          style={{zIndex: 999}}
        >
          <div style={{background: 'white', padding: '2rem'}}>
            <h2>{recipe.name}</h2>
            {recipe.mealMedia.length && <img src={`http://localhost:1337/${recipe.mealMedia[0].url}`} alt={'Recipe cover image'} />}
            <p>{recipe.description}</p>
            <h3>Ingredients</h3>
            <ul>
              {recipe.ingredients.map((ingredent) => <li>{ingredent.name} - {ingredent.quantity}</li>)}
            </ul>
            <h3>Instructions</h3>
            <ol>
              {recipe.instructions.map((instruction) => <li>{instruction.text}</li>)}
            </ol>
          </div>
        </Backdrop>
      </CardContent>
    </Card>
  );
}

const App = ({data: { allStrapiRecipe: {nodes: recipes} }}) => {
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

export const query = graphql`
  query Recipes {
    allStrapiRecipe {
      nodes {
        id
        name
        description
        ingredients {
            name
            quantity
        }
        instructions {
            text
        }
        mealMedia {
          url
        }
      }
    }
  }
`;