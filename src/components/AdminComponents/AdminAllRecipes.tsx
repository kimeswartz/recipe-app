//Hampus + Malcolm

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import allRecipeState from '../../state/Endpoints';


const AdminAllRecipes = () => {

  const { recipeList, fetchAllRecipes, deleteRecipe } = allRecipeState();

  useEffect(() => {
    fetchAllRecipes()
  }, [recipeList])

  const handleDelete = async (recipeId: string) => {
    deleteRecipe(recipeId)
    fetchAllRecipes();
  };


  return (
    <>
      <div className='all-recipes'>
        {recipeList.map((recipe) => {
          return (
            <div className='recipes-card' key={recipe._id}>
              <button className="delete-button" onClick={() => handleDelete(recipe._id)}>Ta bort recept</button>
              <Link to={`/recipe/${recipe._id}`}>
                <div className='first-cards-div'>
                  <img className='display-recipes-img' src={recipe.imageUrl} alt={recipe.title} />
                  <b className='cards-category'>{recipe.categories[0]}</b>
                </div>
                <div className='second-cards-div'>
                  <h2>{recipe.title}</h2>
                  <span>Betyg</span>
                  {recipe.avgRating === null ? <p>inga betyg</p> : <p>{recipe.avgRating}/5</p>}
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default AdminAllRecipes
