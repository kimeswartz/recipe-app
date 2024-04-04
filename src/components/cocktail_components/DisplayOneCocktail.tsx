//Arash

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CocktailInterface from '../../interfaces/CocktailInterfaces/CocktailInterface';
import globalCocktailFunctions from "../../store/CocktailAPICalls";
import { useNavigate } from 'react-router-dom';

// Component for displaying a single cocktail
export function DisplayOneCocktail() {
  // Destructuring state and function from the state management
  const [oneCocktail, setOneCocktail] = useState<CocktailInterface | null>(null);
  const { fetchCocktailById } = globalCocktailFunctions(); // Fetching the function from the state management



  // Extracting cocktailId from URL params
  // we use useParams to acces dynamic parts in the URL, in this case, cocktail id, that will route to the recipe URL request
  const { id } = useParams<{ id: string; }>();

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCocktailById(id ?? ""); // Fetch cocktail by ID with a default value of an empty string
        if (response !== null && response !== undefined) {
          setOneCocktail(response); // Set the fetched cocktail to state
        }
      } catch (error) {
        console.error("Error fetching cocktail:", error);
        navigate("/"); // Redirect on error
      }
    };

    fetchData();
  }, [id, fetchCocktailById, navigate]);


  // Conditional rendering based on whether the cocktail has loaded or not
  if (!oneCocktail) {
    return <div>Loading cocktail...</div>;
  } else {
    return (
      <div className="cocktail-container">
        <div className="header-container">
          <div className="text-container">
            <h1>{oneCocktail?.strDrink}</h1>
            {oneCocktail && <p>{oneCocktail.strInstructions}</p>}
            {oneCocktail && <p>{oneCocktail.strAlcoholic}</p>}
          </div>
          <div className="img-container">
            <img src={oneCocktail?.strDrinkThumb} alt={oneCocktail?.strDrink} />
          </div>
        </div>

        <div className="ingredients-container">
          <div className="upper">
            <h2>Ingredients</h2>
          </div>
          <div className="lower">
            <div className="centered-tags">
              <ul className="list-objects">
                {oneCocktail.ingredients.map((ingredient, index) => (
                  <li key={index} className="ingredient-name">
                    {ingredient.amount} {ingredient.unit} {ingredient.strIngredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="instructions-section">
          <div className="ingredients-wrapper">
            <div className="centered-mobile">
              <h2>Instructions</h2>
              <ol>
                {oneCocktail.strInstructions.split('\n').map((instruction, index) => (
                  <li key={index} className="to-do-step">
                    {instruction.trim()}
                  </li>
                ))}
              </ol>
            </div>
          </div>

        </div>
        <div className="lower">
          <div className="centered-tags">
            <ul className="list-objects">
              {oneCocktail.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-name">
                  {ingredient.strIngredient}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

    );
  }
}

export default DisplayOneCocktail;