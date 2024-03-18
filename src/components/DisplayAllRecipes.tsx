import axios from 'axios';
import { useEffect, useState } from 'react';
import { RecipeInterface } from '../interfaces/RecipeInterface';
import { Link } from 'react-router-dom';
//import DeleteRecipe from './DeleteRecipe'; // Importera DeleteRecipe-komponenten


/**
 * - DENNA FIL SKAPADE JAG ENDAST FÖR ATT LEKA RUNT FÖR ATT INGA MERGEKONFLIKTER SKA SKE.
 * - JAG VILLE INTE ROTA RUNT I DEN RIKTIGA FILEN SÅ JAG SKAPADE DENNA OCH LA TILL ETT S PÅ SLUTET
 *    AV DENNA FIL.
 * ==> VÄRT ATT NOTERA ÄR ATT JAG ANVÄNDER MIG AV ALICE KOMPONENT FÖR ATT RADERA ETT RECEPT,
 *     BEHÖVDE LÄGGA TILL "recipeId" SOM PARAMETER FÖR ATT FÅ DET ATT FUNGERA MED ATT KUNNA 
 *     RADERA MED ETT KLICK PÅ "Delete this recipe".
 */



import "../styling/all_recipes_style.css"

const DisplayAllRecipe = () => {

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
      <div className='all-recipe'>
        {recipeData.map((recipe) => {
          return (
            <div className='recipe-card' key={recipe._id}>
              <button onClick={() => handleDelete(recipe._id)} className="delete-button">Delete this recipe</button>
              <Link to={`/recipe/${recipe._id}`}>
                <div className='first-card-div'>
                  <img className='display-recipe-img' src={recipe.imageUrl} alt={recipe.title} />
                  <b className='card-category'>{recipe.categories[0]}</b>
                </div>
                <div className='second-card-div'>
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

export default DisplayAllRecipe
