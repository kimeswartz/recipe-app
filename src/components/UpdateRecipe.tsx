import axios from "axios";
import { useEffect, useState } from "react";
import { RecipeInterface } from "../interfaces/RecipeInterface";

  const UpdateRecipe = () => {
  
  const [recipeData, setRecipeData] = useState<RecipeInterface[]>([]);
  const [inputTitle, setInputTitle] = useState('');
  
  const URL = "https://sti-java-grupp4-s4yjx9.reky.se";


  const getAllRecipes = async () => {
    try {
      const response = await axios.get(`${URL}/recipes`)

      if (response.status === 200) {
        setRecipeData(response.data);
      }
    } catch (error) {
      console.error('error fetching categories: ', error)
      setRecipeData([])
    }
  }



  // Den här funktionen vill jag ska uppdatera den valda receptet
  const findRecipesById = async () => {
    try {
      const response = await axios.get(`${URL}/recipes/{recipeId}`)
      if (response.status === 200) {
        setRecipeData(response.data)
      }
    } catch (error) {
      console.error('Error fetching category:', error)
      setRecipeData([])
    }
  }


  const handleSelectTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputTitle(e.target.value)
  }

  
  useEffect(() => {
    getAllRecipes()
  }, [])


    return(
        <>
         <div>
            <h3>Find recipe to update</h3>
            <select name="selectRecipe" id="selectRecipe" value={inputTitle} onChange={handleSelectTitleChange}>
                <option value="" selected disabled hidden></option>
                {recipeData.map((update) => {
                    return (
                <option value={update.title}>{update.title}</option>
                )
                })}
            </select>
            <button onClick={() => findRecipesById()}>Update recipes</button>
            <ul>
                {recipeData.map((recipe) => (<li>{recipe._id}</li>))}
            </ul>
        </div>
        </>
    )
}

export default UpdateRecipe

// =======================================================================



/*
  const setBetterName = async (recipeId: string) => {
    
    const recipeUpdate = recipeData.find((recipe) => recipe._id === recipeId)

    const response = await axios.patch(`${URL}/recipes/{recipeId}` /*,requestBody???*)

    if(response.status === 200) {
      const updateRecipeAfterRequest = recipeData.map((existingRecipe) => {

        if(existingRecipe._id !== recipeId) return existingRecipe

        return {
          ...existingRecipe
          
        }
      })
      setRecipe(updateRecipeAfterRequest)
    }
}
*/