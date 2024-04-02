import { useEffect } from 'react';
import globalCocktailFunctions from '../../state/CocktailAPICalls';

const DisplayAllCocktails = () => {
 
  const { cocktailList, fetchAllCocktails } = globalCocktailFunctions();

  useEffect(() => {
    fetchAllCocktails();
  }, []);

  return (
    <div>
      <h2>All Cocktails</h2>
      <ul>
        {/* Loop through all cocktails and render them as list items */}
        {cocktailList.map(cocktail => (
          <li key={cocktail.idDrink}>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} style={{ width: '100px' }} />
            <p>{cocktail.strDrink}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayAllCocktails;