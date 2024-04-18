import { create } from "zustand";
import { RecipeInterface } from "../../interfaces/recipe_interfaces/RecipeInterface";

interface globalRecipeState {
  recipe: RecipeInterface;
  setTitle: (newTitle: string) => void;
  setDescription: (newDescription: string) => void;
  setImageUrl: (newImageUrl: string) => void;
  setTimeInMins: (newTimeInMins: number) => void;
  setCategories: (newCategories: string) => void;
  setInstructions: (newInstructions: string) => void;
  setIngredients: (newIngredient: {
    name: string;
    amount: number;
    unit: string;
  }) => void;
  removeInstruction: (position: number) => void;
  removeIngredient: (position: number) => void;
  setPrice: (newPrice: number) => void;
  emptyRecipe: () => void;
}

const initialRecipe: RecipeInterface = {
  title: "",
  description: "",
  imageUrl: "",
  price: 0,
  timeInMins: 0,
  categories: [],
  instructions: [],
  ingredients: [],
};

const uploadUpdateRecipeState = create<globalRecipeState>((set) => ({
  recipe: { ...initialRecipe },

  setTitle: (newTitle) => {
    set((state) => ({ recipe: { ...state.recipe, title: newTitle } }));
  },

  setDescription: (newDescription) =>
    set((state) => ({
      recipe: { ...state.recipe, description: newDescription },
    })),

  setImageUrl: (newImageUrl) =>
    set((state) => ({ recipe: { ...state.recipe, imageUrl: newImageUrl } })),

  setTimeInMins: (newTimeInMins) =>
    set((state) => ({
      recipe: { ...state.recipe, timeInMins: newTimeInMins },
    })),

  setPrice: (newPrice) => {
    set((state) => ({ recipe: { ...state.recipe, price: newPrice } }));
  },

  setCategories: (selectedCategory) => {
    set((state) => {
      const updatedCategories = state.recipe.categories.includes(
        selectedCategory
      )
        ? state.recipe.categories.filter(
            (category) => category !== selectedCategory
          )
        : [...state.recipe.categories, selectedCategory];
      return { recipe: { ...state.recipe, categories: updatedCategories } };
    });
  },

  setInstructions: (newInstructions) => {
    set((state) => ({
      recipe: {
        ...state.recipe,
        instructions: [...state.recipe.instructions, newInstructions],
      },
    }));
  },

  setIngredients: (newIngredients) => {
    set((state) => ({
      recipe: {
        ...state.recipe,
        ingredients: [...state.recipe.ingredients, newIngredients],
      },
    }));
  },

  removeInstruction: (position) => {
    set((prevState) => ({
      prevState,
      recipe: {
        ...prevState.recipe,
        instructions: prevState.recipe.instructions.filter(
          (_, index) => index !== position
        ),
      },
    }));
  },

  removeIngredient: (position) => {
    set((prevState) => ({
      prevState,
      recipe: {
        ...prevState.recipe,
        ingredients: prevState.recipe.ingredients.filter(
          (_, index) => index !== position
        ),
      },
    }));
  },

  emptyRecipe: () => set({ recipe: { ...initialRecipe } }),
}));

export default uploadUpdateRecipeState;
