//Hampus

import { create } from "zustand";
import CocktailInterface from "../interfaces/CocktailInterface";
import axios from "axios";
import { cocktailURL } from "../constants/ApiUrl";
import IngredientInterface from "../interfaces/IngredientInterface";

interface CocktailStateInterface {
  cocktailList: CocktailInterface[];
  randomCocktail: CocktailInterface;
  oneCocktail: CocktailInterface;
  oneIngredient: IngredientInterface;
  fetchCocktailByName: (cocktailName: string) => Promise<void>;
  fetchIngredient: (ingredientName: string) => Promise<void>;
  fetchRandomCocktail: () => Promise<void>;
  fetchAllCocktails: () => Promise<void>;
  setOneCocktail: (cocktail: CocktailInterface) => void;
}

const globalCocktailFunctions = create<CocktailStateInterface>()((set) => ({
  cocktailList: [],
  randomCocktail: {} as CocktailInterface,
  oneCocktail: {} as CocktailInterface,
  oneIngredient: {} as IngredientInterface,

  fetchCocktailByName: async (name) => {
    try {
      const response = await axios.get(`${cocktailURL}/search.php?s=${name}`);
      if (response.status === 200) {
        set({ oneCocktail: response.data });
      }
    } catch (error) {
      console.log("something went wrong:", error);
    }
  },

  fetchIngredient: async (name) => {
    try {
      const response = await axios.get(`${cocktailURL}/search.php?i=${name}`);
      if (response.status === 200) {
        console.log(response.data.ingredients[0]);
        set({ oneIngredient: response.data.ingredients[0] });
      }
    } catch (error) {
      console.log("something went wrong:", error);
    }
  },

  fetchRandomCocktail: async () => {
    try {
      const response = await axios.get(`${cocktailURL}/random.php`);
      if (response.status === 200) {
        console.log(response.data.drinks[0]);
        set({ randomCocktail: response.data.drinks[0] });
      }
    } catch (error) {
      console.log("something went wrong:", error);
    }
  },

  fetchAllCocktails: async() => {
    try{
      const alcoholicResponse = await axios.get(`${cocktailURL}/filter.php?a=Alcoholic`);
      const nonAlcoholicResponse = await axios.get(`${cocktailURL}/filter.php?a=Non_Alcoholic`);

      if(alcoholicResponse.status === 200 && nonAlcoholicResponse.status === 200){
        console.log('alcoholic', alcoholicResponse.data)
        set({ cocktailList: alcoholicResponse.data })
        console.log('non alco', nonAlcoholicResponse.data)
        set((prevState) => ({
          cocktailList: [prevState.cocktailList, nonAlcoholicResponse.data]
        }))
      }
    }
  },

  setOneCocktail: (newCocktail) => {
    set({ oneCocktail: newCocktail });
  },
}));

export default globalCocktailFunctions;
