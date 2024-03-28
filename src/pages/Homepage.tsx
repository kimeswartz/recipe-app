import CocktailSlider from "../components/CocktailSlider";
import HeaderComponent from "../components/Headers/HeaderComponent";
import RecipeSlider from "../components/RecipeSlider";

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
