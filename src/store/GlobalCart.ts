// Hampus + Bilge

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

const globalCartFunctions = create<GlobalCartInterface>((set) => {
  // Get saved data when page loads
  const savedRecipes = localStorage.getItem("cartRecipes");
  const savedCocktails = localStorage.getItem("cartCocktails");

  const initialState = {
    cartRecipes: savedRecipes ? JSON.parse(savedRecipes) : [],
    cartCocktails: savedCocktails ? JSON.parse(savedCocktails) : [],
    displayCart: false,
  };

  return {
    ...initialState,

    addRecipeToCart: (recipe) => {
      set((state) => {
        const existingRecipeIndex = state.cartRecipes.findIndex(
          (item) => item.recipe._id === recipe._id
        );

        if (existingRecipeIndex !== -1) {
          const updatedCartRecipes = [...state.cartRecipes];
          updatedCartRecipes[existingRecipeIndex].quantity++;

          // Update localStorage after changes
          localStorage.setItem(
            "cartRecipes",
            JSON.stringify(updatedCartRecipes)
          );

          return { cartRecipes: updatedCartRecipes };
        } else {
          const newCartRecipes = [...state.cartRecipes, { recipe, quantity: 1 }];

          // Update localStorage after changes
          localStorage.setItem("cartRecipes", JSON.stringify(newCartRecipes));

          return { cartRecipes: newCartRecipes };
        }
      });
    },

    removeRecipeFromCart: (recipePosition) => {
      set((prevState) => {
        const updatedCartRecipes = [...prevState.cartRecipes.filter(
          (_, index) => index !== recipePosition
        )];

        // Update localStorage after changes
        localStorage.setItem("cartRecipes", JSON.stringify(updatedCartRecipes));

        return { cartRecipes: updatedCartRecipes };
      });
    },

    increaseRecipeQuantity: (recipePosition) => {
      set((prevState) => {
        const updatedCartRecipes = [...prevState.cartRecipes];
        updatedCartRecipes[recipePosition].quantity++;

        // Update localStorage after changes
        localStorage.setItem("cartRecipes", JSON.stringify(updatedCartRecipes));

        return { cartRecipes: updatedCartRecipes };
      });
    },

    decreaseRecipeQuantity: (recipePosition) => {
      set((prevState) => {
        const updatedCartRecipes = [...prevState.cartRecipes];
        if (updatedCartRecipes[recipePosition].quantity > 1) {
          updatedCartRecipes[recipePosition].quantity--;
        }

        // Update localStorage after changes
        localStorage.setItem("cartRecipes", JSON.stringify(updatedCartRecipes));

        return { cartRecipes: updatedCartRecipes };
      });
    },

    addCocktailToCart: (cocktail) => {
      set((state) => {
        const existingCocktailIndex = state.cartCocktails.findIndex(
          (item) => item.cocktail.idDrink === cocktail.idDrink
        );

        if (existingCocktailIndex !== -1) {
          const updatedCartCocktails = [...state.cartCocktails];
          updatedCartCocktails[existingCocktailIndex].quantity++;

          // Update localStorage after changes
          localStorage.setItem("cartCocktails",
            JSON.stringify(updatedCartCocktails)
          );

          return { cartCocktails: updatedCartCocktails };
        } else {
          const newCartCocktails = [...state.cartCocktails, { cocktail, quantity: 1 }];

          // Update localStorage after changes
          localStorage.setItem("cartCocktails", JSON.stringify(newCartCocktails));

          return { cartCocktails: newCartCocktails };
        }
      });
    },

    removeCocktailFromCart: (cocktailPosition) => {
      set((prevState) => {
        const updatedCartCocktails = [...prevState.cartCocktails.filter(
          (_, index) => index !== cocktailPosition
        )];

        // Update localStorage after changes
        localStorage.setItem("cartCocktails", JSON.stringify(updatedCartCocktails));

        return { cartCocktails: updatedCartCocktails };
      });
    },

    increaseCocktailQuantity: (cocktailPosition) => {
      set((prevState) => {
        const updatedCartCocktails = [...prevState.cartCocktails];
        updatedCartCocktails[cocktailPosition].quantity++;

        // Update localStorage after changes
        localStorage.setItem("cartCocktails", JSON.stringify(updatedCartCocktails));

        return { cartCocktails: updatedCartCocktails };
      });
    },

    decreaseCocktailQuantity: (cocktailPosition) => {
      set((prevState) => {
        const updatedCartCocktails = [...prevState.cartCocktails];
        if (updatedCartCocktails[cocktailPosition].quantity > 1) {
          updatedCartCocktails[cocktailPosition].quantity--;
        }

        // Update localStorage after changes
        localStorage.setItem("cartCocktails", JSON.stringify(updatedCartCocktails));

        return { cartCocktails: updatedCartCocktails };
      });
    },

    toggleCart: (mode) => {
      set({ displayCart: !mode });
    },
  };
});

export default globalCartFunctions;
