import { useState } from 'react';
import globalCocktailFunctions from "../../store/CocktailAPICalls";
import CocktailInterface from '../../interfaces/CocktailInterface';

const RandomCocktail = () => {
  const { fetchRandomCocktail } = globalCocktailFunctions();
  const [suggestedCocktails, setSuggestedCocktails] = useState<CocktailInterface[]>([]);

  const generateRandomCocktails = async () => {
    const randomCocktails = [];
    for (let i = 0; i < 5; i++) {
      await fetchRandomCocktail();
      const randomCocktail = globalCocktailFunctions.getState().randomCocktail;
      randomCocktails.push(randomCocktail);
    }
    setSuggestedCocktails(randomCocktails);
  };

  return (
    <div>
      <h2>Random Cocktails</h2>
      <button onClick={generateRandomCocktails}>
        Get inspire and generate 5 random cocktails
      </button>
      <ul>
        {suggestedCocktails.map(cocktail => (
          <li key={cocktail.idDrink}>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} style={{ width: '100px' }} />
            <p>{cocktail.strDrink}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomCocktail;