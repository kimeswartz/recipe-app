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
  cocktailsByIngredient: CocktailInterface[];
  fetchCocktailByName: (cocktailName: string) => Promise<void>;
  fetchCocktailById: (cocktailId: string) => Promise<void>;
  fetchIngredient: (ingredientName: string) => Promise<void>;
  fetchRandomCocktail: () => Promise<void>;
  setOneCocktail: (cocktail: CocktailInterface) => void;
  fetchCocktailsByIngredient: (ingredientByName: string) => Promise<void>;
  fetchCocktailsByLetter: (letter: string) => Promise<void>;
  emptyCocktailList: () => void;
}

const globalCocktailFunctions = create<CocktailStateInterface>()((set) => ({
  cocktailList: [],
  randomCocktail: {} as CocktailInterface,
  oneCocktail: {} as CocktailInterface,
  oneIngredient: {} as IngredientInterface,
  cocktailsByIngredient:[],

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

  fetchCocktailById: async (id) => {
    try {
      const response = await axios.get(`${cocktailURL}/lookup.php?i=${id}`);
      
      if(response.status === 200){
        set({ oneCocktail: response.data.drinks[0] }); 
      }
    } catch(error) {
      console.log('something went wrong:', error);
    }
  },

  fetchIngredient: async (name) => {
    try {
      const response = await axios.get(`${cocktailURL}/search.php?i=${name}`);
      if (response.status === 200) {
        set({ oneIngredient: response.data.ingredients[0] });
      }
    } catch (error) {
      console.log("something went wrong:", error);
    }
  },

  fetchCocktailsByIngredient: async(ingredientByName) => {
    try{
      const response = await axios.get(`${cocktailURL}/filter.php?i=${ingredientByName}`);
      if(response.status === 200){
        console.log(response.data.drinks)
        set({cocktailsByIngredient: response.data.drinks})
      }
    }catch(error){
      console.log("something went wrong:", error)
    }
  },

  fetchRandomCocktail: async() => {
    try{
      const response = await axios.get(`${cocktailURL}/random.php`);
      if(response.status === 200){
        console.log(response.data.drinks[0])
        set({ randomCocktail: response.data.drinks[0] })
      }
    } catch (error) {
      console.log("something went wrong:", error);
    }
  },

  fetchCocktailsByLetter: async(letter) => {
    console.log(letter)
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
      if(response.data.drinks === null){
        set({cocktailList: []})
      }else if (response.data.drinks) {
        console.log(response.data.drinks)
        set({cocktailList: response.data.drinks})
      } 
    } catch (error) {
      // If no drinks found for the letter, set cocktails to an empty array
      console.error('Error fetching cocktails by letter:', error);
      set({cocktailList: []})
    }
  },

  emptyCocktailList: () => {
    set({ cocktailList: [] })
  },

  setOneCocktail: (newCocktail) => {
    set({ oneCocktail: newCocktail });
  },
}));

export default globalCocktailFunctions;