import { create } from "zustand";
import { RecipeInterface } from "../interfaces/RecipeInterface";
import { CartInterface } from "../interfaces/CartInterface";

interface GlobalCartInterface {
  cart: CartInterface[];
  addRecipeToCart: (recipe: RecipeInterface) => void;
  // addCocktailToCart: CocktailInterface;

}

const globalCartFunctions = create<GlobalCartInterface>()((set) => ({

  cart: [],

  addRecipeToCart: (recipe) => {
    alert('Varan har lagts till')
    set((prevState) => ({
      cart: [...prevState.cart, {recipeList: [recipe]}]
    }))
  }

}))

export default globalCartFunctions;