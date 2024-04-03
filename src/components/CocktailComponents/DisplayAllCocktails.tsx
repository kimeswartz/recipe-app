import { useEffect } from "react";
import globalCocktailFunctions from "../../store/CocktailAPICalls";
import "../../styling/CocktailGrid.css"

const DisplayAllCocktails = () => {
  const { cocktailList, fetchAllCocktails } = globalCocktailFunctions();

  useEffect(() => {
    fetchAllCocktails();
  }, []);

  return (
    <div className="cocktail-grid">
      <h2>All Cocktails</h2>
      <div className="cocktail-list">
        {/* Loop through all cocktails and render them as cards */}
        {cocktailList.map((cocktail) => (
          <div key={cocktail.idDrink} className="cocktail-card">
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <p>{cocktail.strDrink}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayAllCocktails;
