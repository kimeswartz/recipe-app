import React, { useState, useEffect } from 'react';
import globalCocktailFunctions from '../../state/CocktailAPICalls';
import '../../styling/Ingredient.css'; 

function DisplayIngredient() {
  const { oneIngredient, fetchIngredient } = globalCocktailFunctions();
  const [ingredientName, setIngredientName] = useState('');

  useEffect(() => {
    // Fetch ingredient when component mounts or ingredientName changes
    if (ingredientName.trim() !== '') {
      fetchIngredient(ingredientName.trim());
    }
  }, [ingredientName, fetchIngredient]);

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setIngredientName(e.target.value);
  };

  return (
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
          <p className="ingredient-type">Type of alcohol: {oneIngredient.strAlcohol}</p>
          <p className="ingredient-description"> {oneIngredient.strDescription}</p>
        </div>
      )}
    </div>
  );
}

export default DisplayIngredient;
