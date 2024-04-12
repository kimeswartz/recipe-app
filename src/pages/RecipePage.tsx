import { useEffect } from "react";
import CategorySuggestion from "../components/recipe_components/CategorySuggestion";
import DisplayRecipes from "../components/recipe_components/DisplayAllRecipe";
import TopRatedRecipes from "../components/recipe_components/TopRatedRecipe";
import globalRecipeFunctions from "../store/RecipeAPICalls";

const RecipePageContent = () => {
  
  const { fetchAllRecipes } = globalRecipeFunctions();

  useEffect(() => {
    fetchAllRecipes();
  }, [])

  return (
    <>
      <CategorySuggestion />
      <TopRatedRecipes />
      <DisplayRecipes />
    </>
  );
};

export default RecipePageContent;
