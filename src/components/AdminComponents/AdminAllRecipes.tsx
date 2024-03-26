//Hampus + Malcolm

import { useEffect } from 'react';
import allRecipeState from '../../state/Endpoints';
import { useNavigate } from 'react-router-dom';
import { RecipeInterface } from '../../interfaces/RecipeInterface';


const AdminAllRecipes = () => {

  const { recipeList, fetchAllRecipes, deleteRecipe, setOneRecipe } = allRecipeState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllRecipes()
  }, [])

  const handleDelete = async (recipeId: string | undefined) => {
    if (recipeId) {
      deleteRecipe(recipeId)
    }
  };

  const handleNavigate = (recipe: RecipeInterface) => {
    setOneRecipe(recipe);
    navigate(`/recipe/${recipe._id}`)
  }

  return (
    <>
      <div className='all-recipes'>
        {recipeList.map((recipe, indexKey) => {
          return (
            <div className='recipes-card' key={indexKey}>
              <button className="delete-button" onClick={() => handleDelete(recipe._id)}>Delete this recipe</button>

              <div className='first-cards-div' onClick={() => handleNavigate(recipe)}>
                <img className='display-recipes-img' src={recipe.imageUrl} alt={recipe.title} />
                <b className='cards-category'>{recipe.categories[0]}</b>
              </div>
              <div className='second-cards-div'>
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

export default AdminAllRecipes
