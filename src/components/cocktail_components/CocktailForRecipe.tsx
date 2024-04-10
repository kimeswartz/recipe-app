import { useEffect } from "react";
import globalRecipeFunctions from "../../store/RecipeAPICalls";
import globalCocktailFunctions from "../../store/CocktailAPICalls";
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
    <div>
      <div>
        <p onClick={handleNavigate}>To this recipe we recommend:</p>
        <p className="pointer">
          <strong>{oneCocktail?.strDrink}</strong>
        </p>
      </div>
    </div>
  );
};

export default CocktailForRecipe;
