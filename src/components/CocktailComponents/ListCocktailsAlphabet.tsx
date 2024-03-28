import { useState } from 'react';
import axios from 'axios';
import CocktailInterface from '../../interfaces/CocktailInterfaces/CocktailInterface';
import { useNavigate } from 'react-router-dom';

const ListCocktailsAlphabet = () => {
  const [cocktails, setCocktails] = useState<CocktailInterface[]>([]);

  const navigate = useNavigate();

  const getCocktailsByLetter = async (letter: string): Promise<void> => {

    console.log('this is the letter', letter)
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
      if (response.data.drinks) {
        setCocktails(response.data.drinks);
        console.log(cocktails)
        navigate(`/cocktails/${letter}`)
      } else {
        // If no drinks found for the letter, set cocktails to an empty array
        setCocktails([]);
      }
    } catch (error) {
      console.error('Error fetching cocktails by letter:', error);
    }
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div>
      {alphabet.map((letter : string, index) => (
        <span key={index}>
          <button onClick={() => getCocktailsByLetter(letter) }>
            {letter}
          </button>
        </span>
          
      ))}

      <ul>
        {cocktails.map((cocktail) => (
          <li key={cocktail.idDrink}>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} style={{ width: '100px', height: '100px' }} />
            <p>{cocktail.strDrink}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCocktailsAlphabet;