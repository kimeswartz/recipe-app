import { useEffect, useState } from 'react';
import CocktailInterface from '../interfaces/CocktailInterface'; // Antag att detta är sökvägen till ditt gränssnitt

const CocktailForRecipe = () => {
  const [recommendedCocktail, setRecommendedCocktail] = useState<CocktailInterface | null>(null);

  useEffect(() => {
    // En lista med namn och bildlänkar för 15 cocktails
    const allCocktails: CocktailInterface[] = [
        {
            idDrink: "15941",
            strDrink: "Americano",
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/709s6m1613655124.jpg",
            strInstructions: "Instructions for making an Americano cocktail.",
            strAlcoholic: "Alcoholic"
          },
          {
            idDrink: "17216",
            strDrink: "Margarita",
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/wpxpvu1439905379.jpg",
            strInstructions: "Instructions for making a Margarita cocktail.",
            strAlcoholic: "Alcoholic"
          },
          {
            idDrink: "17164",
            strDrink: "Cosmopolitan",
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/upxxpq1439907580.jpg",
            strInstructions: "Instructions for making a Cosmopolitan cocktail.",
            strAlcoholic: "Alcoholic"
          },
          {
            idDrink: "17166",
            strDrink: "Caipirinha",
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/jgvn7p1582484435.jpg",
            strInstructions: "Instructions for making a Caipirinha cocktail.",
            strAlcoholic: "Alcoholic"
          },
          {
            idDrink: "17168",
            strDrink: "Mai Tai",
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/twyrrp1439907470.jpg",
            strInstructions: "Instructions for making a Mai Tai cocktail.",
            strAlcoholic: "Alcoholic"
          },
          {
            idDrink: "17204",
            strDrink: "Sex on the Beach",
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/fi67641668420787.jpg",
            strInstructions: "Instructions for making a Sex on the Beach cocktail.",
            strAlcoholic: "Alcoholic"
          },
          {
            idDrink: "17205",
            strDrink: "Espresso Martini",
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/n0sx531504372951.jpg",
            strInstructions: "Instructions for making an Espresso Martini cocktail.",
            strAlcoholic: "Alcoholic"
          },
          {
            idDrink: "17207",
            strDrink: "Pina Colada",
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/upgsue1668419912.jpg",
            strInstructions: "Instructions for making a Pina Colada cocktail.",
            strAlcoholic: "Alcoholic"
          },
          {
            idDrink: "17210",
            strDrink: "Daiquiri",
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg",
            strInstructions: "Instructions for making a Daiquiri cocktail.",
            strAlcoholic: "Alcoholic"
          },
          {
            idDrink: "17212",
            strDrink: "Moscow Mule",
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg",
            strInstructions: "Instructions for making a Moscow Mule cocktail.",
            strAlcoholic: "Alcoholic"
          },
          {
            idDrink: "17213",
            strDrink: "Piña Colada",
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/2uwggr1504888674.jpg",
            strInstructions: "Instructions for making a Piña Colada cocktail.",
            strAlcoholic: "Alcoholic"
          },
          {
            idDrink: "17215",
            strDrink: "Mojito",
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg",
            strInstructions: "Instructions for making a Mojito cocktail.",
            strAlcoholic: "Alcoholic"
          },
          {
            idDrink: "17217",
            strDrink: "Tequila Sunrise",
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/quqyqp1480879103.jpg",
            strInstructions: "Instructions for making a Tequila Sunrise cocktail.",
            strAlcoholic: "Alcoholic"
          },
          {
            idDrink: "17222",
            strDrink: "Pisco Sour",
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/tsssur1439907622.jpg",
            strInstructions: "Instructions for making a Pisco Sour cocktail.",
            strAlcoholic: "Alcoholic"
          },
          {
            idDrink: "17223",
            strDrink: "Long Island Tea",
            strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/wx7hsg1504370510.jpg",
            strInstructions: "Instructions for making a Long Island Tea cocktail.",
            strAlcoholic: "Alcoholic"
          }
        ];

    // Slumpmässigt välj en cocktail
    const randomIndex = Math.floor(Math.random() * allCocktails.length);
    setRecommendedCocktail(allCocktails[randomIndex]);
  }, []);

  return (
    <div>
      <h1>Recommended Cocktail for Recipe</h1>
      {recommendedCocktail && (
        <div>
          <h3>{recommendedCocktail.strDrink}</h3>
          <img src={recommendedCocktail.strDrinkThumb} alt={recommendedCocktail.strDrink} />
        </div>
      )}
    </div>
  );
}

export default CocktailForRecipe;
      