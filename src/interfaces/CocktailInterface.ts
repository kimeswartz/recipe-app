interface CocktailInterface {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strAlcoholic: string;
  ingredients: { strIngredient: string }[];
}

export default CocktailInterface;
