// CocktailPage.js
import React, { useState, useEffect } from 'react';
import globalCocktailFunctions from '../../store/CocktailAPICalls';
import '../../styling/CocktailGridStyle.css';
import '../../styling/Ingredient.css'; 

const CocktailPage = () => {
  const { cocktailsByIngredient, fetchCocktailsByIngredient, oneIngredient, fetchIngredient } = globalCocktailFunctions();
  const [ingredientName, setIngredientName] = useState('');

  useEffect(() => {
    if (ingredientName.trim() !== '') {
      fetchIngredient(ingredientName.trim());
      fetchCocktailsByIngredient(ingredientName.trim());
    }
  }, [ingredientName, fetchIngredient, fetchCocktailsByIngredient]);

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setIngredientName(e.target.value);
  };

  return (
    <div className="cocktail-page">
      <div className="display-ingredient-container">
        <h2>Display Ingredient</h2>
        <input
          type="text"
          placeholder="Enter ingredient name"
          value={ingredientName}
          onChange={handleChange}
        />
        {oneIngredient.strIngredient && (
          <div className="display-ingredient-info">
            <h3 className="ingredient-name"> {oneIngredient.strIngredient} </h3>
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
        <h2>Cocktails with {ingredientName}</h2>
        <div className="cocktail-list">
          {cocktailsByIngredient.map((cocktail) => (
            <div key={cocktail.idDrink} className="cocktail-card">
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

export default CocktailPage;
