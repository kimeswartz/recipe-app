import { create } from "zustand";
import { RecipeInterface } from "../interfaces/RecipeInterface";
import axios from "axios";
import { UploadRecipeInterface } from "../interfaces/UploadInterface";


interface recipeStateInterface{
  recipeList: RecipeInterface[];
  oneRecipe: RecipeInterface[];
  fetchAllRecipes: () => Promise<void>;
  addRecipe: (newRecipe: UploadRecipeInterface, fetchAllRecipes: () => Promise<void>) => void;
  deleteRecipe: (id: string, fetchAllRecipes: () => Promise<void>) => void;
  fetchOneRecipe: (id: string) => void;
}

const URL = "https://sti-java-grupp4-s4yjx9.reky.se"

const allRecipeState = create<recipeStateInterface>()((set) => ({
  recipeList: [],
  oneRecipe: [],

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

  fetchOneRecipe: async(id) => {
    try {
      const response = await axios.get(`${URL}/recipes/${id}`);
      if(response.status === 200){
        set( {oneRecipe : response.data })
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      return null;
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
  },

  deleteRecipe: async(id, fetchAllRecipes) => {
    try{
      const response = await axios.delete(
        `https://sti-java-grupp4-s4yjx9.reky.se/recipes/${id}`
      );
      if (response.status === 204) {
        console.log("Recipe deleted successfully");
        fetchAllRecipes();
      }

    }catch(error){
      console.error('Error deleting recipe:', error)
    }
  },

}))

export default allRecipeState;