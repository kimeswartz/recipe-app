import DisplayAllCocktails from "../components/cocktail_components/DisplayAllCocktails";
import ListCocktailsAlphabet from "../components/cocktail_components/ListCocktailsAlphabet";

const CocktailHomePage = () => {
  return (
    <div>
      <h1>Cocktail Page</h1>
      <ListCocktailsAlphabet />
      <DisplayAllCocktails />
    </div>
  );
};

export default CocktailHomePage;
