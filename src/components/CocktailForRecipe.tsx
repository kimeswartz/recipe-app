import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import globalCocktailFunctions from '../store/CocktailAPICalls';
import allRecipeState from '../store/Endpoints';

function CocktailForRecipes() {
  // Destructuring state and functions from global states
  const { oneRecipe } = allRecipeState();
  const { cocktailList } = globalCocktailFunctions();

  // Extracting recipeId from URL params
  const { recipeId } = useParams<{ recipeId: string }>();
  const [suggestedCocktail, setSuggestedCocktail] = useState<any>(null);

  // Logic to suggest a cocktail based on the recipe
  useEffect(() => {
    if (oneRecipe && oneRecipe.title && cocktailList.length > 0) {
      // Example logic: suggest a random cocktail from the list of cocktails
      const randomIndex = Math.floor(Math.random() * cocktailList.length);
      setSuggestedCocktail(cocktailList[randomIndex]);
    }
  }, [oneRecipe, cocktailList]);

  return (
    <div>
      <h1>Suggested Cocktail for Recipe</h1>
      <p>Recipe ID: {recipeId}</p>
      {suggestedCocktail && (
        <div>
          <h2>Suggested Cocktail</h2>
          <p>Name: {suggestedCocktail.strDrink}</p>
          <p>Instructions: {suggestedCocktail.strInstructions}</p>
          <p>Alcoholic: {suggestedCocktail.strAlcoholic}</p>
        </div>
      )}
    </div>
  );
}

export default CocktailForRecipes;