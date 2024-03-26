import { create } from "zustand";
import { RecipeInterface } from "../interfaces/RecipeInterface";
import { CartInterface } from "../interfaces/CartInterface";

interface GlobalCartInterface {
  cart: CartInterface[];
  displayCart: boolean;
  addRecipeToCart: (recipe: RecipeInterface) => void;
  removeRecipeFromCart: (removeId: string) => void;
  toggleCart: (mode: boolean) => void;
  // addCocktailToCart: CocktailInterface;

}

const globalCartFunctions = create<GlobalCartInterface>()((set) => ({

  cart: [],
  displayCart: false,

  addRecipeToCart: (recipe) => {
    alert('Varan har lagts till')
    set((prevState) => ({
      cart: [...prevState.cart, {recipeList: [recipe]}]
    }))
  },

  removeRecipeFromCart: (removeId) => {
    set((prevState) => ({
      cart: prevState.cart.filter((cartItem) =>
        !cartItem.recipeList.some((recipe) => recipe._id === removeId)
      )
    }));
  },

  toggleCart: (mode) => {
    set({displayCart: !mode})
  },
}))

export default globalCartFunctions;