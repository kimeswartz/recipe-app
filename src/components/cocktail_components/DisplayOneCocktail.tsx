import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import globalCocktailFunctions from "../../store/CocktailAPICalls";

const DisplayOneCocktail = () => {
  const { oneCocktail, fetchCocktailById } = globalCocktailFunctions();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchCocktailById(id);
    }
  }, [id, fetchCocktailById]);

  const generateIngredientsList = (cocktail: {
    [ingredientName: string]: any;
  }) => {
    const ingredientsList = [];

    for (let i = 1; i <= 15; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;
      if (cocktail[ingredientKey]) {
        ingredientsList.push(
          <li key={i}>
            {cocktail[ingredientKey]} amount:{" "}
            {cocktail[measureKey] || "To taste"}
          </li>
        );
      }
    }

    return ingredientsList;
  };

  return (
    <div className="cocktail-container">
      <div className="header-container">
        <div className="text-container">
          <h1>{oneCocktail.strDrink}</h1>
          {oneCocktail.strInstructions && <p>{oneCocktail.strInstructions}</p>}
          {oneCocktail.strAlcoholic && <p>{oneCocktail.strAlcoholic}</p>}
        </div>
        {oneCocktail.strDrinkThumb && (
          <div className="img-container">
            <img src={oneCocktail.strDrinkThumb} alt={oneCocktail.strDrink} />
          </div>
        )}
      </div>
      <div className="ingredients-container">
        <div className="upper">
          <h2>Ingredients</h2>
        </div>
        <div className="lower">
          <div className="centered-tags">
            <ul className="list-objects">
              {generateIngredientsList(oneCocktail)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayOneCocktail;
