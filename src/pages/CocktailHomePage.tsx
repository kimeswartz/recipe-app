import CocktailLetters from "../components/cocktail_components/CocktailLetter";
import ListCocktailsAlphabet from "../components/cocktail_components/ListCocktailsAlphabet";

const CocktailHomePage = () => {
  return (
    <div>
      <h1>Our Cocktails</h1>
      <ListCocktailsAlphabet />
      <CocktailLetters />
    </div>
  );
};

export default CocktailHomePage;
