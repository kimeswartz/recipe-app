import { useState } from 'react';
import axios from 'axios';
import Cocktail from '../../interfaces/CocktailInterfaces/CocktailInterface';
import { Link } from 'react-router-dom'; // Import React Router's Link component

const ListCocktailsAlphabet = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  // Function to fetch drinks based on the selected letter
  const getCocktailsByLetter = async (letter: string): Promise<void> => {
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
      // Filter out cocktails that don't start with the selected letter
      const filteredCocktails = (response.data.drinks || []).filter((cocktail: Cocktail) =>
        cocktail.strDrink.charAt(0).toUpperCase() === letter
      );
      setCocktails(filteredCocktails); // Set cocktails to filtered drinks
    } catch (error) {
      console.error('Error fetching cocktails by letter:', error);
    }
  };

  // List of letters
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div>
      {/* Render a link for each letter */}
      {alphabet.map((letter, index) => (
        <Link key={index} to={`/cocktails/${letter}`}> {/* Link to the page for the selected letter */}
          <button onClick={() => getCocktailsByLetter(letter)}>
            {letter}
          </button>
        </Link>
      ))}

      {/* Render drinks */}
      <ul>
        {cocktails.map(cocktail => (
          <li key={cocktail.idDrink}>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} style={{ width: '100px' }} />
            <p>{cocktail.strDrink}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCocktailsAlphabet;