export interface CocktailInterface {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strAlcoholic: string;
  strCategory: string;
  strIBA: string;
  strGlass: string;
  [key: `strIngredient${number}`]: string | undefined;
  [key: `strMeasure${number}`]: string | undefined;
}