import TopRatedRecipes from "../components/recipe_components/TopRatedRecipe";

// lägg till en navigate som navigerar till popular recipes page

const PopularRecipes = () => {
  return (
    <div>
      <div className="spacer-container">
        <h1>Popular recipes</h1>
      </div>
      <TopRatedRecipes />
    </div>
  );
};

export default PopularRecipes;
