import { create } from "zustand";
import { RecipeInterface } from "../interfaces/RecipeInterface";
import axios from "axios";
import { UploadRecipeInterface } from "../interfaces/UploadInterface";


interface recipeStateInterface{
  recipeList: RecipeInterface[];
  fetchAllRecipes: () => Promise<void>;
  addRecipe: (newRecipe: UploadRecipeInterface, fetchAllRecipes: () => Promise<void>) => void;
}

const URL = "https://sti-java-grupp4-s4yjx9.reky.se"

const allRecipeState = create<recipeStateInterface>()((set) => ({
  recipeList: [],

  fetchAllRecipes: async() => {
    try{
      const response = await axios.get<RecipeInterface[]>(`${URL}/recipes`)
      if(response.status === 200){
        set({ recipeList: response.data })
      }
    }catch(error){
      console.error('Error fetching all recipes', error)
    }
  },

  addRecipe: async(newRecipe: UploadRecipeInterface, fetchAllRecipes ) => {
    try{
      const response = await axios.post<UploadRecipeInterface>(`${URL}/recipes`, newRecipe)
      
      if(response.status === 200){
        console.log('Successful post: ', response.data )
        console.log(response.status)
        fetchAllRecipes();
      }
      
    }catch(error){
      console.error('Error from post attempt:', error)
    }
  }

    
}))

export default allRecipeState;