//Pablo + Malcolm + Hampus

import CocktailInterface from "../../interfaces/cocktails_interfaces/CocktailInterface";
import "../../styling/CocktailGridStyle.css";
import { useNavigate } from "react-router-dom";
import globalCocktailFunctions from "../../store/cocktails_store/CocktailAPICalls";

const CocktailLetters = () => {
  const { setOneCocktail, cocktailList } = globalCocktailFunctions();
  const navigate = useNavigate();

  const handleNavigate = (cocktail: CocktailInterface) => {
    setOneCocktail(cocktail);
    navigate(`/cocktail/${cocktail.idDrink}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className="standard-container  green-background">
      <div className="cocktail-grid">
        <ul className="cocktail-list">
          {cocktailList.map((cocktail) => (
            <ul
              key={cocktail.idDrink}
              className="cocktail-card pointer"
              onClick={() => handleNavigate(cocktail)}
            >
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <h3 className="centered-container find-cocktails">{cocktail.strDrink}</h3>
            </ul>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CocktailLetters;
