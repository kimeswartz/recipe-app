//Hampus

import { create } from "zustand";
import { RecipeInterface } from "../interfaces/RecipeInterface";
import axios from "axios";
import { UploadRecipeInterface } from "../interfaces/UploadInterface";
import { categoryInterface } from "../interfaces/CategoryInterface";

interface recipeStateInterface {
  recipeList: RecipeInterface[];
  oneRecipe: RecipeInterface;
  categoryList: categoryInterface[];
  fetchAllRecipes: () => Promise<void>;
  addRecipe: (newRecipe: UploadRecipeInterface) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
  fetchOneRecipe: (id: string) => Promise<void>;
  fetchAllCategories: () => Promise<void>;
  fetchOneCategory: (categoryName: string) => Promise<void>;
}

const URL = "https://sti-java-grupp4-s4yjx9.reky.se";

const allRecipeState = create<recipeStateInterface>()((set) => ({
  recipeList: [],
  oneRecipe: {} as RecipeInterface,
  categoryList: [],

  fetchAllRecipes: async () => {
    try {
      const response = await axios.get(`${URL}/recipes`);
      if (response.status === 200) {
        set({ recipeList: response.data });
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
        console.log(response.data);
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
        set({ categoryList: response.data });
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
        set({ recipeList: response.data });
      }
    } catch (error) {
      console.error("Error fetching recipes by category:", error);
    }
  },

  addRecipe: async (newRecipe: UploadRecipeInterface) => {
    const { fetchAllRecipes } = allRecipeState();
    try {
      const response = await axios.post<UploadRecipeInterface>(
        `${URL}/recipes`,
        newRecipe
      );

      if (response.status === 200) {
        console.log("Successful post: ", response.data);
        console.log(response.status);
        fetchAllRecipes();
      }
    } catch (error) {
      console.error("Error from post attempt:", error);
    }
  },

  deleteRecipe: async (id) => {
    try {
      const response = await axios.delete(`${URL}/${id}`);
      if (response.status === 204) {
        console.log("Recipe deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  },
}));

export default allRecipeState;
