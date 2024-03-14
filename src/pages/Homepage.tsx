import DisplayAllRecipe from "../components/DisplayAllRecipe";
import RecipeSearch from "../components/SearchRecipe";
import UploadRecipe from "../components/UploadRecipe";
import CategorySuggestion from "../components/CategorySuggestion";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home- Page</h1>
      <CategorySuggestion />
      <div className="card">
        <h3>This is the search component:</h3>
        <RecipeSearch />
        <h3>Here you can add a recipe</h3>
        <UploadRecipe />
        <DisplayAllRecipe />
      </div>
    </div>
  );
};

export default Home;
