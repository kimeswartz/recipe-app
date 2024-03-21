import { useEffect } from 'react';
import allRecipeState from '../state/Endpoints';
import { useNavigate } from 'react-router-dom';

import "../styling/AllRecipeStyle.css"

const DisplayAllRecipe = () => {

  const { recipeList, fetchAllRecipes } = allRecipeState();

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllRecipes();
  }, [ recipeList])

  // Kim: This code is updated to connect with css
  return (
    <>
      <div className='all-recipe'>
        {recipeData.map((recipe) => (
          <Link to={`/recipe/${recipe._id}`} className="recipe-link" key={recipe._id}>
            <div className='recipe-card'>
              <div className='first-card-div'>
                <img className='display-recipe-img' src={recipe.imageUrl} alt={recipe.title} />
                <b className='card-category'>{recipe.categories[0]}</b>
              </div>
              <div className='second-card-div'>
                <h3>{recipe.title}</h3>
                <span>Betyg</span>
                {recipe.avgRating === null ? <p>inga betyg</p> : <p>{recipe.avgRating}/5</p>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
        }
  

export default DisplayAllRecipe;