//Hampus

import { create } from 'zustand';
import CocktailInterface from '../interfaces/CocktailInterfaces/CocktailInterface';
import axios from 'axios';
import { cocktailURL } from '../constants/ApiUrl';

interface CocktailStateInterface {
  cocktailList: CocktailInterface[];
  oneCocktail: CocktailInterface;
  //oneIngredient: IngredientInterface;
  fetchAllCocktails: () => Promise<void>;
  fetchCocktailByName: (cocktailName: string) => Promise<void>;
  fetchIngredient: (ingredientName: string) => Promise<void>;
}

const globalCocktailFunctions = create<CocktailStateInterface>()((set) => ({
  cocktailList: [],
  oneCocktail: {} as CocktailInterface,

  fetchAllCocktails: async() => {
    try{
      const response = await axios.get(`${cocktailURL}/search.php?s=`)
      if(response.status === 200){
        set({ cocktailList: response.data.drinks})
        console.log(response.data.drinks)
      }
    }catch(error){
      console.log('something went wrong:', error)
    }
  },

  fetchCocktailByName: async(name) => {
    try{
      const response = await axios.get(`${cocktailURL}/search.php?s=${name}`);
      if(response.status === 200){
        set({ oneCocktail: response.data})
      }
    }catch(error){
      console.log('something went wrong:', error)
    }
  }, 

  fetchIngredient: async(name) => {
    
  }
}))

export default globalCocktailFunctions;