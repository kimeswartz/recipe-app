import { useEffect } from 'react';
import globalCocktailFunctions from '../../store/CocktailAPICalls';
import '../../styling/CocktailGridStyle.css';
import '../../styling/Ingredient.css'; 
import { useNavigate, useParams } from 'react-router-dom';

const DisplayIngredient = () => {
  const { cocktailsByIngredient, fetchCocktailsByIngredient, oneIngredient, fetchIngredient } = globalCocktailFunctions();
  const navigate = useNavigate();
  const { ingredientId } = useParams<{ ingredientId?: string }>(); 
  
  useEffect(() => {
    console.log("ingredientId:", ingredientId); 
    if (ingredientId && ingredientId.trim() !== '') { 
      fetchIngredient(ingredientId.trim());
      fetchCocktailsByIngredient(ingredientId.trim())
    }
  }, [ingredientId, fetchIngredient, fetchCocktailsByIngredient]); 

  const handleClick = (id: string) => {
    navigate(`/cocktail/${id}`)
    window.scrollTo(0,0)
  }

  return (
    <div className="cocktail-page">
      <div className="display-ingredient-container">
        {oneIngredient.strIngredient && (
          <div className="display-ingredient-info">
            <h3 className="ingredient-name"> {oneIngredient.strIngredient}</h3>

            <img
              src={`https://www.thecocktaildb.com/images/ingredients/${oneIngredient.strIngredient}-Medium.png`}
              alt={oneIngredient.strIngredient}
              className="ingredient-image"
            />
            <p className="ingredient-type">Alcoholic: {oneIngredient.strAlcohol}</p>
            <p className="ingredient-description"> {oneIngredient.strDescription}</p>
          </div>
        )}
      </div>

      <div className="cocktail-grid">
        <h2>Cocktails with {oneIngredient.strIngredient} </h2>
        <div className="cocktail-list">
          {cocktailsByIngredient.map((cocktail) => (
            <div key={cocktail.idDrink} className="cocktail-card" onClick={() => handleClick(cocktail.idDrink)}>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <p>{cocktail.strDrink}</p>
              <p>{cocktail.strInstructions}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayIngredient;
