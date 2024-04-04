import DisplayAllCocktails from "../components/CocktailComponents/DisplayAllCocktails";
import ListCocktailsAlphabet from "../components/CocktailComponents/ListCocktailsAlphabet";

const CocktailHomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <ListCocktailsAlphabet />
      <DisplayAllCocktails />
    </div>
  );
};

export default CocktailHomePage;
