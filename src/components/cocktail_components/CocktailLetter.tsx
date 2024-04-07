import CocktailInterface from '../../interfaces/CocktailInterface';
import "../../styling/CocktailGridStyle.css"
import { useNavigate } from 'react-router-dom';
import globalCocktailFunctions from '../../store/CocktailAPICalls';

const CocktailLetters = () => {
  const { setOneCocktail, cocktailList } = globalCocktailFunctions();
  const navigate = useNavigate();

  const handleNavigate = (cocktail: CocktailInterface) => {
    setOneCocktail(cocktail)
    navigate(`/cocktail/${cocktail.idDrink}`)
  }

  return (
    <div className="cocktail-grid">

      <ul className="cocktail-list">
        {cocktailList.map((cocktail) => (
          <ul key={cocktail.idDrink} className="cocktail-card" onClick={() => handleNavigate(cocktail)} >
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <p>{cocktail.strDrink}</p>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default CocktailLetters;