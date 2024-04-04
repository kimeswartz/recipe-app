import { useEffect } from "react";
import globalCocktailFunctions from "../../store/CocktailAPICalls";
import "../../styling/CocktailGridStyle.css"

const DisplayAllCocktails = () => {
  const { cocktailList } = globalCocktailFunctions(); //vet inte om denna behövs längre

  useEffect(() => {
    //tomt
  }, []);

  return (
    <div className="cocktail-grid">
      <h2>All Cocktails</h2>
      <div className="cocktail-list">
        {/* Loop through all cocktails and render them as cards */}
        {cocktailList.map((cocktail) => (
          <div key={cocktail.idDrink} className="cocktail-card" >
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <p>{cocktail.strDrink}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayAllCocktails;
