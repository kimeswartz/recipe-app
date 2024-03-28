import { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayAllCocktails = () => {
  const [cocktails, setCocktails] = useState<any[]>([]); // Here we store cocktails fetched from the API

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        // Fetch all cocktails from the API when the component mounts
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        setCocktails(response.data.drinks); // Save cocktails in state
      } catch (error) {
        console.error('Error fetching cocktails:', error);
      }
    };

    fetchCocktails(); // Call the function to fetch cocktails when the component mounts
  }, []);

  return (
    <div>
      <h2>All Cocktails</h2>
      <ul>
        {/* Loop through all cocktails and render them as list items */}
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

export default DisplayAllCocktails;