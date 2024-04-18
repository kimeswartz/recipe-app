//Pablo + Hampus

import { useEffect } from "react";
import globalRecipeFunctions from "../../store/recipes_store/RecipeAPICalls";
import globalCocktailFunctions from "../../store/cocktails_store/CocktailAPICalls";
import { useNavigate } from "react-router-dom";

const CocktailForRecipe = () => {
  const { oneRecipe } = globalRecipeFunctions();
  const {
    oneCocktail,
    setOneCocktail,
    cocktailsByIngredient,
    fetchCocktailsByIngredient,
  } = globalCocktailFunctions();

  const navigate = useNavigate();

  const ingredientVariable = "Vodka";

  useEffect(() => {
    fetchCocktailsByIngredient(ingredientVariable).then(() => {
      let recipeValue = oneRecipe.price;
      while (recipeValue > 94) {
        recipeValue = recipeValue / 3;
      }
      recipeValue = Math.trunc(recipeValue);

      if (
        recipeValue === undefined ||
        recipeValue === 0 ||
        isNaN(recipeValue)
      ) {
        recipeValue = 69;
      }
      setOneCocktail(cocktailsByIngredient[recipeValue]);
    });
  }, [oneRecipe]);

  const handleNavigate = () => {
    navigate(`/cocktail/${oneCocktail?.idDrink}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="spacer-container">
      To this recipe we recommend :
      <strong>
        <span onClick={handleNavigate} className="lightup-text pointer"> {oneCocktail?.strDrink}</span>
      </strong>
    </div>
  );
};

export default CocktailForRecipe;