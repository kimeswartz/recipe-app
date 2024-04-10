//Hampus

import { create } from "zustand";
import { RecipeInterface } from "../interfaces/RecipeInterface";
import CocktailInterface from "../interfaces/CocktailInterface";

interface GlobalCartInterface {
  cartRecipes: RecipeInterface[];
  cartCocktails: CocktailInterface[];
  displayCart: boolean;
  addRecipeToCart: (recipe: RecipeInterface) => void;
  removeRecipeFromCart: (recipePosition: number) => void;
  toggleCart: (mode: boolean) => void;
  addCocktailToCart: (recipe: CocktailInterface) => void;
  removeCocktailFromCart: (cocktail: number) => void;
}

const globalCartFunctions = create<GlobalCartInterface>()((set) => ({
  cartRecipes: [],
  cartCocktails: [],
  displayCart: false,


  addRecipeToCart: (recipe) => {
    alert("Varan har lagts till");
    set((prevState) => ({
      cartRecipes: [...prevState.cartRecipes, recipe],
    }));
  },

  removeRecipeFromCart: (recipePosition) => {
    set((prevState) => ({
      cartRecipes: prevState.cartRecipes.filter(
        (_, index) => index !== recipePosition
      ),
    }));
  },

  addCocktailToCart: (cocktail) => {
    alert("Cocktail har lagts till");
    set((prevState) => ({
      prevState,
      cartCocktails: [...prevState.cartCocktails, cocktail],
    }));
  },

  removeCocktailFromCart: (cocktailPosition) => {
    set((prevState) => ({
      prevState,
      cartCocktails: prevState.cartCocktails.filter(
        (_, index) => index !== cocktailPosition
      ),
    }));
  },

  toggleCart: (mode) => {
    set({ displayCart: !mode });
  },


}));

export default globalCartFunctions;
