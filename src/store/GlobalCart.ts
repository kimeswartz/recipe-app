//Hampus

import { create } from "zustand";
import { RecipeInterface } from "../interfaces/RecipeInterface";
import CocktailInterface from "../interfaces/CocktailInterface";

interface GlobalCartInterface {
  cartRecipes: { recipe: RecipeInterface; quantity: number }[];
  cartCocktails: { cocktail: CocktailInterface; quantity: number }[];
  displayCart: boolean;
  addRecipeToCart: (recipe: RecipeInterface) => void;
  removeRecipeFromCart: (recipePosition: number) => void;
  addCocktailToCart: (recipe: CocktailInterface) => void;
  removeCocktailFromCart: (cocktailPosition: number) => void;
  toggleCart: (mode: boolean) => void;
  increaseRecipeQuantity: (recipePosition: number) => void;
  decreaseRecipeQuantity: (recipePosition: number) => void;
  increaseCocktailQuantity: (cocktailPosition: number) => void; 
  decreaseCocktailQuantity: (cocktailPosition: number) => void; 
}

const globalCartFunctions = create<GlobalCartInterface>((set) => ({
  cartRecipes: [],
  cartCocktails: [],
  displayCart: false,

  addRecipeToCart: (recipe) => {
    set((state) => {
      
      const existingRecipeIndex = state.cartRecipes.findIndex(item => item.recipe._id === recipe._id);
  
      if (existingRecipeIndex !== -1) {
      
        const updatedCartRecipes = [...state.cartRecipes];
        updatedCartRecipes[existingRecipeIndex].quantity++;
        return { cartRecipes: updatedCartRecipes };
      } else {
        
        return { cartRecipes: [...state.cartRecipes, { recipe, quantity: 1 }] };
      }
    });
  },
  

  removeRecipeFromCart: (recipePosition) => {
    set((prevState) => ({
      cartRecipes: prevState.cartRecipes.filter(
        (_, index) => index !== recipePosition
      ),
    }));
  },

  increaseRecipeQuantity: (recipePosition) => {
    set((prevState) => {
      const updatedCartRecipes = [...prevState.cartRecipes];
      updatedCartRecipes[recipePosition].quantity++;
      return { cartRecipes: updatedCartRecipes };
    });
  },

  decreaseRecipeQuantity: (recipePosition) => {
    set((prevState) => {
      const updatedCartRecipes = [...prevState.cartRecipes];
      if (updatedCartRecipes[recipePosition].quantity > 1) {
        updatedCartRecipes[recipePosition].quantity--;
      }
      return { cartRecipes: updatedCartRecipes };
    });
  },

  addCocktailToCart: (cocktail) => {
    set((state) => {
      
      const existingCocktailIndex = state.cartCocktails.findIndex(item => item.cocktail.idDrink === cocktail.idDrink);
  
      if (existingCocktailIndex !== -1) {
        
        const updatedCartCocktails = [...state.cartCocktails];
        updatedCartCocktails[existingCocktailIndex].quantity++;
        return { cartCocktails: updatedCartCocktails };
      } else {
        
        return { cartCocktails: [...state.cartCocktails, { cocktail, quantity: 1 }] };
      }
    });
  },
  

  removeCocktailFromCart: (cocktailPosition) => {
    set((prevState) => ({
      prevState,
      cartCocktails: prevState.cartCocktails.filter(
        (_, index) => index !== cocktailPosition
      ),
    }));
  },

  increaseCocktailQuantity: (cocktailPosition) => {
    set((prevState) => {
      const updatedCartCocktails = [...prevState.cartCocktails];
      updatedCartCocktails[cocktailPosition].quantity++;
      return { cartCocktails: updatedCartCocktails };
    });
  },

  decreaseCocktailQuantity: (cocktailPosition) => {
    set((prevState) => {
      const updatedCartCocktails = [...prevState.cartCocktails];
      if (updatedCartCocktails[cocktailPosition].quantity > 1) {
        updatedCartCocktails[cocktailPosition].quantity--;
      }
      return { cartCocktails: updatedCartCocktails };
    });
  },

  toggleCart: (mode) => {
    set({ displayCart: !mode });
  },



}));

export default globalCartFunctions;
