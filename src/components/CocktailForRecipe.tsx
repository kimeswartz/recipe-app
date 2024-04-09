import { useEffect, useState } from "react";
import axios from "axios";
import globalRecipeFunctions from "../store/RecipeAPICalls";
import globalCocktailFunctions from "../store/CocktailAPICalls";


const CocktailForRecipe = () => {

  const { oneRecipe } = globalRecipeFunctions();
  const { cocktailsByIngredient, fetchCocktailsByIngredient } = globalCocktailFunctions();


  const ingredientVariable = 'Vodka';

  useEffect(() => {
    fetchCocktailsByIngredient(ingredientVariable);
    console.log('all vodka cocktails', cocktailsByIngredient)
    pickARandomDrink();
  }, []);

  const pickARandomDrink = () => {
    if(oneRecipe)
  }


  return (
    <div>
      {/* <h2>{cocktail.strDrink}</h2> */}
      {/* <p>{cocktail.strInstructions}</p> */}
      <div>
        <h3>Recommended Cocktail for :</h3>
        {/* <p>{categoryCocktail}</p> */}
      </div>
    </div>
  );
};

export default CocktailForRecipe;