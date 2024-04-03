import React from 'react';
import DisplayAllCocktails from '../../components/CocktailComponents/DisplayAllCocktails';
import ListCocktailsAlphabet from '../../components/CocktailComponents/ListCocktailsAlphabet';
import Ingredient from './Ingredient';

const CocktailHomePage: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Ingredient />
      <ListCocktailsAlphabet />
      <DisplayAllCocktails /> 
    </div>
  );
};

export default CocktailHomePage;