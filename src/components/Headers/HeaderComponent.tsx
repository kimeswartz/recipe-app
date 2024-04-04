import "../../styling/HeaderComponent.css";
import RecipeSearch from '../SearchRecipe';

const HeaderComponent = () => {
  return (
    <header className="home-header">
      <div className="header-content">
        <h1 className="header-title">Fresh, Flavorful Recipes Await!</h1>
        <p className="header-paragraph">Welcome to Flavor Haven - Creative Recipes to Wow Your Tastebuds</p>
        <div className="margin-container">
          <RecipeSearch />
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;