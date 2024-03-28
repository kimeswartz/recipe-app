//Hampus

import { create } from "zustand";
import { RecipeInterface } from "../interfaces/RecipeInterface";

interface GlobalCartInterface {
  cartRecipes: RecipeInterface[];
  // cartCocktails: CocktailInterface[];
  displayCart: boolean;
  addRecipeToCart: (recipe: RecipeInterface) => void;
  removeRecipeFromCart: (recipePosition: number) => void;
  toggleCart: (mode: boolean) => void;
  // addCocktailToCart: CocktailInterface;
}

const globalCartFunctions = create<GlobalCartInterface>()((set) => ({

  cartRecipes: [],
  // cartCocktails: [],
  displayCart: false,

  addRecipeToCart: (recipe) => {
    alert('Varan har lagts till')
    set((prevState) => ({
      cartRecipes: [...prevState.cartRecipes, recipe]
    }))
  },

  removeRecipeFromCart: (recipePosition) => {
    set((prevState) => ({
      cartRecipes: prevState.cartRecipes.filter((_, index ) => index !== recipePosition)
    }))
  },

  toggleCart: (mode) => {
    set({displayCart: !mode})
  },
}))

export default globalCartFunctions;