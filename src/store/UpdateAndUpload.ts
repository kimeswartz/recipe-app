import { create } from "zustand";
import { RecipeInterface } from "../interfaces/RecipeInterface";
import allRecipeState from "./Endpoints";

interface globalRecipeState{
  recipe: RecipeInterface;
  setTitle: (newTitle: string) => void;
  setDescription: (newDescription: string) => void;
  setImageUrl: (newImageUrl: string) => void;
  setTimeInMins: (newTimeInMins: number) => void;
  setCategories: (newCategories: string[]) => void;
  setInstructions: (newInstructions: string[]) => void;
  setIngredients: (newIngredients: RecipeInterface['ingredients']) => void;
  emptyRecipe: () => void;
  addNewRecipe: () => void;
  updateOldRecipe: (id: string) => void;
}

const initialRecipe: RecipeInterface = {
  title: "",
  description: "",
  ratings: [],
  imageUrl: "",
  timeInMins: 0,
  categories: [],
  instructions: [],
  ingredients: [],
}

const uploadUpdateRecipeState = create<globalRecipeState>((set) => ({
  recipe: { ...initialRecipe },

  setTitle: (newTitle: string) =>
    set((state) => ({ recipe: { ...state.recipe, title: newTitle } })),

  setDescription: (newDescription: string) =>
    set((state) => ({ recipe: { ...state.recipe, description: newDescription } })),

  setImageUrl: (newImageUrl: string) =>
    set((state) => ({ recipe: { ...state.recipe, imageUrl: newImageUrl } })),

  setTimeInMins: (newTimeInMins: number) =>
    set((state) => ({ recipe: { ...state.recipe, timeInMins: newTimeInMins } })),

  setCategories: (newCategories: string[]) =>
    set((state) => ({ recipe: { ...state.recipe, categories: newCategories } })),

  setInstructions: (newInstructions: string[]) =>
    set((state) => ({ recipe: { ...state.recipe, instructions: newInstructions } })),

  setIngredients: (newIngredients: RecipeInterface['ingredients']) =>
    set((state) => ({ recipe: { ...state.recipe, ingredients: newIngredients } })),
    
  emptyRecipe: () => set({ recipe: { ...initialRecipe } }),

  addNewRecipe: () => {
    allRecipeState.getState().addRecipe(uploadUpdateRecipeState.getState().recipe)
  },

  updateOldRecipe: (id: string) => {
    allRecipeState.getState().updateRecipe(uploadUpdateRecipeState.getState().recipe, id)
  },

}))

export default uploadUpdateRecipeState;