//Hampus

import { useEffect } from 'react';
import allRecipeState from '../state/Endpoints';
import { useNavigate, useLocation } from 'react-router-dom';

import "../styling/AllRecipeStyle.css"
import { RecipeInterface } from '../interfaces/RecipeInterface';

const DisplayAllRecipe = () => {

  const { recipeList, fetchAllRecipes, setOneRecipe, deleteRecipe } = allRecipeState();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllRecipes();
  }, [])

  const handleDelete = async (recipeId: string | undefined) => {
    if (recipeId) {
      deleteRecipe(recipeId)
    }
  };

  const handleNavigate = (recipe: RecipeInterface) => {
    setOneRecipe(recipe)
    navigate(`/recipe/${recipe._id}`)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <div className='all-recipe'>
        {recipeList.map((recipe) => {
          return (
            <div className='recipe-card' key={recipe._id} onClick={() => handleNavigate(recipe)}>
              {location.pathname === '/AdminPage' && (
                <button onClick={() => handleDelete(recipe._id)} className='main-button'>Radera</button>
              )}
              <div className='first-card-div'>
                <img className='display-recipe-img' src={recipe.imageUrl} alt={recipe.title} />
                <b className='card-category'>{recipe.categories[0]}</b>
              </div>
              <div className='second-card-div'>
                <h2>{recipe.title}</h2>
                <span>Betyg</span>
                {recipe.avgRating === null ? <p>inga betyg</p> : <p>{recipe.avgRating?.toFixed(1)}/5</p>}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default DisplayAllRecipe