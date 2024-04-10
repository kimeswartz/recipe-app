import CocktailInterface from "../../interfaces/CocktailInterface";
import "../../styling/CocktailGridStyle.css";
import { useNavigate } from "react-router-dom";
import globalCocktailFunctions from "../../store/CocktailAPICalls";

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
              <p className="centered-container">{cocktail.strDrink}</p>
            </ul>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CocktailLetters;
