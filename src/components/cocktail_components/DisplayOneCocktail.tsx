//Arash


import globalCocktailFunctions from "../../store/CocktailAPICalls";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// Component for displaying a single cocktail
const DisplayOneCocktail = () => {
  // Destructuring state and function from the state management

  const { oneCocktail, fetchCocktailById } = globalCocktailFunctions(); // Fetching the function from the state management
  const { id } = useParams<{id: string}>();

  useEffect(() => {
    if(id){
      fetchCocktailById(id)
    }
  }, [])

  const navigate = useNavigate();
  
  return (
    <div className="cocktail-container">
      <div className="header-container">
        <div className="text-container">
          <h1>{oneCocktail.strDrink}</h1>
          {oneCocktail && <p>{oneCocktail.strInstructions}</p>}
          {oneCocktail && <p>{oneCocktail.strAlcoholic}</p>}
        </div>
        <div className="img-container">
          <img src={oneCocktail.strDrinkThumb} alt={oneCocktail.strDrink} />
        </div>
      </div>

      <div className="ingredients-container">
        <div className="upper">
          <h2>Ingredients</h2>
        </div>
        <div className="lower">
          <div className="centered-tags">
            <ul className="list-objects"> //
            {oneCocktail.strIngredient1 && (
              <li>{oneCocktail.strIngredient1} amount : {oneCocktail.strMeasure1}</li>
            )}
            {oneCocktail.strIngredient2 && (
              <li>{oneCocktail.strIngredient2} amount : {oneCocktail.strMeasure2}</li>
            )}
            {oneCocktail.strIngredient3 && (
              <li>{oneCocktail.strIngredient3} amount : {oneCocktail.strMeasure3}</li>
            )}
            {oneCocktail.strIngredient4 && (
              <li>{oneCocktail.strIngredient4} amount : {oneCocktail.strMeasure4}</li>
            )}
            {oneCocktail.strIngredient5 && (
              <li>{oneCocktail.strIngredient5} amount : {oneCocktail.strMeasure5}</li>
            )}
            {oneCocktail.strIngredient6 && (
              <li>{oneCocktail.strIngredient6} amount : {oneCocktail.strMeasure6}</li>
            )}
            {oneCocktail.strIngredient7 && (
              <li>{oneCocktail.strIngredient7} amount : {oneCocktail.strMeasure7}</li>
            )}
            {oneCocktail.strIngredient8 && (
              <li>{oneCocktail.strIngredient8} amount : {oneCocktail.strMeasure8}</li>
            )}
            {oneCocktail.strIngredient9 && (
              <li>{oneCocktail.strIngredient9} amount : {oneCocktail.strMeasure9}</li>
            )}
            {oneCocktail.strIngredient10 && (
              <li>{oneCocktail.strIngredient10} amount : {oneCocktail.strMeasure10}</li>
            )}
            {oneCocktail.strIngredient11 && (
              <li>{oneCocktail.strIngredient11} amount : {oneCocktail.strMeasure11}</li>
            )}
            {oneCocktail.strIngredient12 && (
              <li>{oneCocktail.strIngredient12} amount : {oneCocktail.strMeasure12}</li>
            )}
            {oneCocktail.strIngredient13 && (
              <li>{oneCocktail.strIngredient13} amount : {oneCocktail.strMeasure13}</li>
            )}
            {oneCocktail.strIngredient14 && (
              <li>{oneCocktail.strIngredient14} amount : {oneCocktail.strMeasure14}</li>
            )}
            {oneCocktail.strIngredient15 && (
              <li>{oneCocktail.strIngredient15} amount : {oneCocktail.strMeasure15}</li>
            )}
            </ul>
          </div>
        </div>
      </div>
      <div className="instructions-section">
        <div className="ingredients-wrapper">
          <div className="centered-mobile">
            <h2>Instructions</h2>
              <p className="to-do-step">
                {oneCocktail.strInstructions}
              </p>
          </div>
        </div>

      </div>
      
    </div>
  );
}

export default DisplayOneCocktail;