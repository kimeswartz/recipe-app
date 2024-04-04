//Hampus + Alice + Arash

import { create } from "zustand";
import { RecipeInterface } from "../interfaces/RecipeInterface";
import axios from "axios";
import { CommentInterface } from "../interfaces/CommentInterface";
import URL from "../constants/RecipeApi";

interface recipeStateInterface {
  recipeList: RecipeInterface[];
  oneRecipe: RecipeInterface;
  recipeComment: CommentInterface[];
  categoryList: [];
  categoryRecipeList: RecipeInterface[];
  setOneRecipe: (recipe: RecipeInterface) => void;
  fetchAllRecipes: () => Promise<void>;
  addRecipe: (newRecipe: RecipeInterface) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
  fetchOneRecipe: (id: string) => Promise<void>;
  fetchAllCategories: () => Promise<void>;
  fetchOneCategory: (categoryName: string) => Promise<void>;
  addRating: (rating: number, id: string | undefined) => Promise<void>;
  fetchComments: (id: string) => Promise<void>;
  addComment: (comments: string, id: string | undefined) => Promise<void>; //arash
  updateRecipe: (updatedRecipe: RecipeInterface, id: string | undefined) => Promise<void>;
  clearAPI: () => Promise<void>;
}

const allRecipeState = create<recipeStateInterface>()((set) => ({
  recipeList: [],
  oneRecipe: {} as RecipeInterface,
  recipeComment: [],
  categoryList: [],
  categoryRecipeList: [],

  setOneRecipe: (recipe: RecipeInterface) => {
    set({oneRecipe: recipe})
  },

  fetchAllRecipes: async () => {
    try {
      const response = await axios.get(`${URL}/recipes`);
      if (response.status === 200) {
        set({ recipeList: response.data });
        console.log('fetched all recipes')
      }
    } catch (error) {
      console.error("Error fetching all recipes", error);
    }
  },

  fetchOneRecipe: async (id) => {
    try {
      const response = await axios.get(`${URL}/recipes/${id}`);
      if (response.status === 200) {
        console.log("Successfull get");
        set((state) => ({
          ...state,
          oneRecipe: response.data,
        }));
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  },


  fetchAllCategories: async () => {
    try {
      const response = await axios.get(`${URL}/categories`);
      if (response.status === 200) {
        console.log("Successfull get");
        const categoryNames = response.data.map((category: any) => category.name)
        set({ categoryList: categoryNames });
      }
    } catch (error) {
      console.error("Error fetching all categories", error);
    }
  },

  fetchOneCategory: async (categoryName: string) => {
    try {
      const response = await axios.get(
        `${URL}/categories/${categoryName}/recipes`
      );
      if (response.status === 200) {
        console.log("Successfull get");
        set({ categoryRecipeList: response.data });
      }
    } catch (error) {
      console.error("Error fetching recipes by category:", error);
    }
  },

  addRecipe: async (newRecipe: RecipeInterface) => {
    try {
      const response = await axios.post<RecipeInterface>(`${URL}/recipes`,newRecipe);

      if (response.status === 200) {
        console.log("Successful post: ", response.data);
        console.log(response.status);
        set((prevState) => ({
          ...prevState,
          recipeList: [...prevState.recipeList, response.data]
        }));
        console.log('Added recipe to recipeList')
      }
    } catch (error) {
      console.error("Error from post attempt:", error);
    }
  },

  deleteRecipe: async (id) => {
    try {
      const response = await axios.delete(`${URL}/recipes/${id}`);
      if (response.status === 204) {
        console.log("Recipe deleted successfully");
        set((state) => ({
          ...state,
          recipeList: state.recipeList.filter(recipe => recipe._id !== id)
        }))
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  },

  addRating: async (rating, id) => {
    try {
      const response = await axios.post(
        `https://sti-java-grupp4-s4yjx9.reky.se/recipes/${id}/ratings`,
        { rating: rating }
      );
      if (response.status === 200) {
        console.log(
          `Rating ${rating}/5 has been updated for recipe:${id} in the database`
        );
        alert("Tack för ditt betyg");
      }
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  },

  fetchComments: async (id: string) => {
    try {
      const response = await axios.get(`${URL}/recipes/${id}/comments`);
      if (response.status === 200) {
        console.log("Successfully fetched comments");
        set ({recipeComment: response.data})
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  },  //arash

  addComment: async (comment, id) => {
    try {
        const response = await axios.post(`${URL}/recipes/${id}/comments`, { comment });
        if (response.status === 200) {
          console.log(`Comment ${comment} has been updated for recipe:${id} in the database`);
          set((prevState) => ({
            prevState,
            recipeComment: [...prevState.recipeComment, response.data]
          }))
          alert("Tack för din kommentar")
          return response.data;
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
}, //arash

  updateRecipe: async(updatedRecipe, id) => {
    try{
      const response = await axios.patch(
        `${URL}/recipes/${id}`,
        updatedRecipe
      );
      if (response.status === 200) {
        //make something happen
        alert('recipe was updated')
      }
    }catch(error){
      console.error("Error updating recipe:", error);
    }
  },

  clearAPI: async() => {
    try{
      const response = await axios.get(`${URL}/clear`)
      if(response.status){
        alert('You just removed everything. Congrats! :)')
      }
    }catch(error){
      console.log('could not clear database', error);
    }
  }

}));

export default allRecipeState;