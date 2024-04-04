import React from 'react';
import DisplayAllCocktails from '../../components/CocktailComponents/DisplayAllCocktails';
import ListCocktailsAlphabet from '../../components/CocktailComponents/ListCocktailsAlphabet';
import RandomCocktail from '../../components/CocktailComponents/RandomCocktail';

const CocktailHomePage: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <RandomCocktail />
      <ListCocktailsAlphabet />
      <DisplayAllCocktails /> 
    </div>
  );
};

export default CocktailHomePage;