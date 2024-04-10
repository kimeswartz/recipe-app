import { useEffect } from "react";
import globalRecipeFunctions from "../store/RecipeAPICalls";
import globalCocktailFunctions from "../store/CocktailAPICalls";
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
      console.log(recipeValue);
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
      console.log("this is the value", recipeValue);
    });
    console.log("all vodka cocktails", cocktailsByIngredient);
  }, [oneRecipe]);

  const handleNavigate = () => {
    navigate(`/cocktail/${oneCocktail?.idDrink}`);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div>
        <p onClick={handleNavigate}>
          <strong>To this recipe we recommend:</strong>
        </p>
        <p className="info-tag pointer">{oneCocktail?.strDrink}</p>
      </div>
    </div>
  );
};

export default CocktailForRecipe;
