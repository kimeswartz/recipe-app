import CocktailSlider from "../components/cocktail_components/CocktailSlider";
import HeaderComponent from "../components/HeaderComponent";
import RecipeSlider from "../components/recipe_components/RecipeSlider";

const Home = () => {
  return (
    <div>
      <div className="card">
        <HeaderComponent />
        <RecipeSlider />
        <CocktailSlider />
      </div>
    </div>
  );
};

export default Home;
