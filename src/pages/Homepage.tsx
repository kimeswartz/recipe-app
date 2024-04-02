import CocktailSlider from "../components/CocktailComponents/CocktailSlider";
import DisplayIngredient from "../components/CocktailComponents/DisplayIngredient";
import HeaderComponent from "../components/Headers/HeaderComponent";
import RecipeSlider from "../components/RecipeSlider";

const Home = () => {
  return (
    <div>
      <div className="card">
        <HeaderComponent />
        <RecipeSlider />
        <CocktailSlider />
        <DisplayIngredient />
      </div>
    </div>
  );
};

export default Home;
