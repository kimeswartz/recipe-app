import CocktailLetters from "../components/cocktail_components/CocktailLetter";
import ListCocktailsAlphabet from "../components/cocktail_components/ListCocktailsAlphabet";

const CocktailHomePage = () => {
  return (
    <div>
      <div className="spacer-container">
        <h1>Our Cocktails</h1>
      </div>

      <ListCocktailsAlphabet />
      <CocktailLetters />
    </div>
  );
};

export default CocktailHomePage;