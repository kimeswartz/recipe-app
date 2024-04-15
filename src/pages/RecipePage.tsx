import { useEffect } from "react";
import CategorySuggestion from "../components/recipe_components/CategorySuggestion";
import DisplayRecipes from "../components/recipe_components/DisplayAllRecipe";
import TopRatedRecipes from "../components/recipe_components/TopRatedRecipe";
import globalRecipeFunctions from "../store/RecipeAPICalls";

const RecipePageContent = () => {
  
  const { fetchAllRecipes, recipeList } = globalRecipeFunctions();

  useEffect(() => {
    if(recipeList.length === 0){
      console.log(recipeList)
      fetchAllRecipes();
    }
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
