import React, { useState, useEffect } from 'react';
import globalCocktailFunctions from '../../state/CocktailAPICalls';

function DisplayIngredient() {
  const { oneIngredient, fetchIngredient } = globalCocktailFunctions();
  const [ingredientName, setIngredientName] = useState('');

  useEffect(() => {
    
    if (ingredientName.trim() !== '') {
      fetchIngredient(ingredientName.trim());
    }
  }, [ingredientName, fetchIngredient]);

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setIngredientName(e.target.value);
  };

  return (
    <div>
      <h2>Display Ingredient</h2>
      <input
        type="text"
        placeholder="Enter ingredient name"
        value={ingredientName}
        onChange={handleChange}
      />
      {oneIngredient.strIngredient && (
        <div>
          <p>Ingredient name: {oneIngredient.strIngredient} </p>
          <p> Description: {oneIngredient.strDescription}</p>
          <p> Type of alcohol : {oneIngredient.strAlcohol}</p>
          <p> ID: {oneIngredient.idIngredient}</p>
        </div>
      )}
    </div>
  );
}

export default DisplayIngredient;
