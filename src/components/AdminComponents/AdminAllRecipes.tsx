import axios from 'axios';
import { useEffect, useState } from 'react';
import { RecipeInterface } from '../../interfaces/RecipeInterface';
import { Link } from 'react-router-dom';


const AdminAllRecipes = () => {

  const [recipeData, setRecipe] = useState<RecipeInterface[]>([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await axios.get<RecipeInterface[]>("https://sti-java-grupp4-s4yjx9.reky.se/recipes");
        if (response.status === 200) {
          setRecipe(response.data);
          console.log("Success fetching data from Swagger/Recipes");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getRecipes();
  }, [])

  const handleDelete = async (recipeId: string) => {
    try {
      const response = await axios.delete(
        `https://sti-java-grupp4-s4yjx9.reky.se/recipes/${recipeId}`
      );
      if (response.status === 204) {
        console.log("Recipe deleted successfully");
        alert("Recipe deleted successfully")
      }
    } catch (error) { 
      console.error("Error deleting recipe:", error);
      alert("NOT DELETED???");
    }
  };
  

  return (
    <>
      <div className='all-recipes'>
        {recipeData.map((recipe) => {
          return (
            <div className='recipes-card' key={recipe._id}>
              <button className="delete-button" onClick={() => handleDelete(recipe._id)}>Delete this recipe</button>
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
