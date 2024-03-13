import axios from 'axios';
import { useEffect, useState } from 'react';
import { RecipeInterface } from '../interfaces/RecipeInterface';
import { useNavigate } from 'react-router-dom';

const DisplayAllRecipe = () => {

  const [recipeData, setRecipe] = useState<RecipeInterface[]>([]);
  const navigate = useNavigate();

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

  const handleNavigate = (path: string, name: string) => {
    const encodedName = encodeURIComponent(name);
    navigate(`/Recipes/${path}-${encodeURIComponent(encodedName)}`);
  }

  return (
    <>
      <div className='all-recipe'>
        {recipeData.map((recipe) => {
          return (
            <div className='recipe-card' key={recipe._id} onClick={() => handleNavigate(recipe._id, recipe.title)}>
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
          )
        })}
      </div>
    </>
  )
}

export default DisplayAllRecipe