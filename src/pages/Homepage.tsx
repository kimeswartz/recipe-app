import DisplayAllRecipe from "../components/DisplayAllRecipe";
import RecipeSlider from "../components/RecipeSlider";
import RecipeSearch from "../components/SearchRecipe";

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Home- Page</h1>
            <div className="card">
                <h3>This is the search component:</h3>
                <RecipeSearch />
                <RecipeSlider/>
                <DisplayAllRecipe />
            </div>

        </div>
    );
};

export default Home;
