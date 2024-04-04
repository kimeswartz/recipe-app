import { useEffect, useState } from 'react';
import axios from 'axios';
import CocktailInterface from '../../interfaces/CocktailInterface';
import { useParams } from 'react-router-dom';
import ListCocktailsAlphabet from './ListCocktailsAlphabet';
import "../../styling/CocktailGridStyle.css"
import { useNavigate } from 'react-router-dom';
import globalCocktailFunctions from '../../store/CocktailAPICalls';

const CocktailLetterPage = () => {
  const { letter } = useParams<{ letter: string | undefined }>();
  const [cocktails, setCocktails] = useState<CocktailInterface[]>([]);
  const { setOneCocktail } = globalCocktailFunctions();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCocktailsByLetter();
  }, [letter]);

  const fetchCocktailsByLetter = async () => {
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
      if (response.data.drinks) {
        console.log(response.data.drinks)
        setCocktails(response.data.drinks);
      } 
    } catch (error) {
      // If no drinks found for the letter, set cocktails to an empty array
      console.error('Error fetching cocktails by letter:', error);
      setCocktails([]);
    }
  };

  const handleNavigate = (cocktail: CocktailInterface) => {
    setOneCocktail(cocktail)
    navigate(`/cocktail/${cocktail.idDrink}`)
  }

  return (
    <div className="cocktail-grid">
      <h2>Cocktails starting with {letter}</h2>
      <ListCocktailsAlphabet />
      <ul className="cocktail-list">
        {cocktails.map((cocktail) => (
          <ul key={cocktail.idDrink} className="cocktail-card" onClick={() => handleNavigate(cocktail)} >
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <p>{cocktail.strDrink}</p>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default CocktailLetterPage;