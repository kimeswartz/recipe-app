import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CocktailInterface from '../../interfaces/CocktailInterfaces/CocktailInterface';
import { useParams } from 'react-router-dom'; 
import ListCocktailsAlphabet from './ListCocktailsAlphabet'; 

const CocktailLetterPage: React.FC = () => {
  const { letter } = useParams<{ letter: string | undefined }>();
  const [cocktails, setCocktails] = useState<CocktailInterface[]>([]);

  useEffect(() => {
    const fetchCocktailsByLetter = async () => {

      try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
        if (response.data.drinks) {
          console.log(response.data.drinks)
          const filteredCocktails = response.data.drinks.filter((cocktail: CocktailInterface) =>
            cocktail.strDrink.charAt(0).toUpperCase() === letter
          );
          setCocktails(filteredCocktails);
        } else {
          // If no drinks found for the letter, set cocktails to an empty array
          setCocktails([]);
        }
      } catch (error) {
        console.error('Error fetching cocktails by letter:', error);
      }
    };

    fetchCocktailsByLetter();
  }, [letter]);

  return (
    <div>
      <h2>Cocktails starting with {letter}</h2>
      <ListCocktailsAlphabet />
      <ul>
        {cocktails.map((cocktail) => (
          <li key={cocktail.idDrink}>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} style={{ width: '100px' }} />
            <p>{cocktail.strDrink}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CocktailLetterPage;