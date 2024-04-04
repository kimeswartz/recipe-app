import React from 'react';
import DisplayAllCocktails from '../../components/CocktailComponents/DisplayAllCocktails';
import ListCocktailsAlphabet from '../../components/CocktailComponents/ListCocktailsAlphabet';

const CocktailHomePage: React.FC = () => {
  return (
    <div>
      <h1>Cocktail Page</h1>
      <ListCocktailsAlphabet />
      <DisplayAllCocktails /> 
    </div>
  );
};

export default CocktailHomePage;