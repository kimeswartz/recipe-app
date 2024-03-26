import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cocktail from '../../interfaces/CocktailInterfaces/CocktailInterface';
import { useParams } from 'react-router-dom'; 
import ListCocktailsAlphabet from './ListCocktailsAlphabet'; 

const CocktailLetterPage: React.FC = () => {
  // Extract the 'letter' parameter from the URL using useParams hook
  const { letter } = useParams<{ letter: string }>();

  // State to store the list of cocktails starting with the selected letter
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  // Fetch cocktails by letter when 'letter' parameter changes or component mounts
  useEffect(() => {
    const fetchCocktailsByLetter = async () => {
      try {
        // Fetch cocktails from the API based on the selected letter
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
        // Filter cocktails to include only those starting with the selected letter
        const filteredCocktails = (response.data.drinks || []).filter((cocktail: Cocktail) =>
          cocktail.strDrink.charAt(0).toUpperCase() === letter
        );
        // Update state with the filtered list of cocktails
        setCocktails(filteredCocktails);
      } catch (error) {
        console.error('Error fetching cocktails by letter:', error);
      }
    };

    fetchCocktailsByLetter();
  }, [letter]); // Dependency array with 'letter' ensures the effect is re-run when 'letter' changes

  return (
    <div>
      {/* Display the selected letter and ListCocktailsAlphabet component */}
      <h2>Cocktails starting with {letter}</h2>
      <ListCocktailsAlphabet />
      {/* Render the list of cocktails starting with the selected letter */}
      <ul>
        {cocktails.map(cocktail => (
          <li key={cocktail.idDrink}>
            {/* Display cocktail image, name, and style */}
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} style={{ width: '100px' }} />
            <p>{cocktail.strDrink}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CocktailLetterPage;