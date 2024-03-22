import { create } from "zustand";
import { RecipeInterface } from "../interfaces/RecipeInterface";
import axios from "axios";
import { UploadRecipeInterface } from "../interfaces/UploadInterface";

// Defining our interface to specify the structure of the state
// We define an empty array which can hold multiple objects
// Followed by oneRecipe which is declared to hold a single recipe object
// Followed by a function to to fetch all recipes
// Functions that returns promises to add, delete and fetch a single recipe
interface recipeStateInterface {
  recipeList: RecipeInterface[];
  oneRecipe: RecipeInterface;
  fetchAllRecipes: () => Promise<void>;
  addRecipe: (newRecipe: UploadRecipeInterface) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
  fetchOneRecipe: (id: string) => Promise<void>;
}

// Our base URL for the backend API
const URL = "https://sti-java-grupp4-s4yjx9.reky.se";

// We use Zustand 'store' to set up an initial state (empty string and empty object)
// Which will be used to manage recipe-related state in the app.
const allRecipeState = create<recipeStateInterface>()((set) => ({
  recipeList: [],
  oneRecipe: {} as RecipeInterface,

  // Function to fetch all recipes async.
  fetchAllRecipes: async () => {
    try {
      const response = await axios.get(`${URL}/recipes`); // GET request to fecth all, recipes
      if (response.status === 200) {
        set({ recipeList: response.data }); // Updating the recipeList state with the fetched data
      }
    } catch (error) {
      console.error("Error fetching all recipes", error);
    }
  },

  // Function to fetch a single recipe asynchronously by ID
  fetchOneRecipe: async (id) => {
    try {
      const response = await axios.get(`${URL}/recipes/${id}`); // Making GET request for singöe recipe
      if (response.status === 200) {
        console.log("Successfull get");
        set((state) => ({
          ...state,
          oneRecipe: response.data, // Updating the OneRecipe state with fetched recipe
        }));
        console.log(response.data); // Logging the fetched recipe data
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  },

  //Functiopn to add a new recipe asynchronously
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

  // Function to delete a recipe asynchronously by ID
  deleteRecipe: async (id) => {
    try {
      const response = await axios.delete(`${URL}/recipes/${id}`);
      if (response.status === 204) {
        console.log("Recipe deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  },
}));

export default allRecipeState;
