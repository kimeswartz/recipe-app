import React from 'react';
import DisplayAllCocktails from '../../components/cocktail_components/DisplayAllCocktails';
import ListCocktailsAlphabet from '../../components/cocktail_components/ListCocktailsAlphabet';
import RandomCocktail from '../../components/cocktail_components/RandomCocktail';

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