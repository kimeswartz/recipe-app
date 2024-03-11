import axios from 'axios';
import { useEffect, useState } from 'react';
import { RecipeInterface } from '../interfaces/RecipeInterface';

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

  return (
    <>
      <div className='all-recipe'>
        {recipeData.map((recipe) => {
          return (
            <div className='recipe-card' key={recipe._id}>
              <img className='display-recipe-img' src={recipe.imageUrl} alt={recipe.title} />
              <h2 className='hidden-title'>{recipe.title}</h2>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default DisplayAllRecipe