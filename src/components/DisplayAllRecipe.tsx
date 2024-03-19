import axios from 'axios';
import { useEffect, useState } from 'react';
import { RecipeInterface } from '../interfaces/RecipeInterface';
import { Link } from 'react-router-dom';

import "../styling/AllRecipeStyle.css"

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
            <Link to={`/recipe/${recipe._id}`}>
              <div className='recipe-card' key={recipe._id}>
                <div className='first-card-div'>
                  <img className='display-recipe-img' src={recipe.imageUrl} alt={recipe.title} />
                  <b className='card-category'>{recipe.categories[0]}</b>
                </div>
                <div className='second-card-div'>
                  <h2>{recipe.title}</h2>
                  <span>Betyg</span>
                  {recipe.avgRating === null ? <p>inga betyg</p> : <p>{recipe.avgRating}/5</p>}
                </div>
              </div>
            </Link>
            
          )
        })}
      </div>
    </>
  )
}

export default DisplayAllRecipe