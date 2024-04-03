import { useEffect } from "react";
import globalCocktailFunctions from "../../store/CocktailAPICalls";
import { useNavigate } from "react-router-dom";
import "../../styling/CocktailGrid.css"

const DisplayAllCocktails = () => {
  const { cocktailList } = globalCocktailFunctions(); //vet inte om denna behövs längre

  const navigate = useNavigate();

  useEffect(() => {
    //brukade fetcha allCocktails här
  }, []);

  return (
    <div className="cocktail-grid">
      <h2>All Cocktails</h2>
      <div className="cocktail-list">
        {/* Loop through all cocktails and render them as cards */}
        {cocktailList.map((cocktail) => (
          <div key={cocktail.idDrink} className="cocktail-card" onClick={() => navigate(`cocktails/${cocktail.idDrink}`)}>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <p>{cocktail.strDrink}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayAllCocktails;
