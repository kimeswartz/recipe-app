import { useEffect, useState } from "react";
import axios from "axios";
import { RecipeInterface } from "../interfaces/RecipeInterface";

// Skapar en funktion som ska hämta och visa alla recept
const DisplayRecipes = () => {

  // Uppdaterar listan med recept [recipeData] med hjälp av useState-hook, med funktionen setRecipe.
  // Denna hook representerar en lista med objekt (innehållande recept), som matchar vår interface (Som i sin tur matchar vårt API).
  const [recipeData, setRecipe] = useState<RecipeInterface[]>([]);

// Vi kör en useEffect, med funktionen fetchData för att hämta data genom vårt API. Denna körs varje gång recipeData uppdateras.
// async innebär att vi kan använda en await, som betyder att vi kan låta sidans innehåll presenteras för användaren, medan vi anropar API.
// Vi anänder axios för att göra en GET request, med förväntade datatyper motsvarande vår interface <RecipeInterface>

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RecipeInterface[]>(
          "https://sti-java-grupp4-s4yjx9.reky.se/recipes"
        );
        setRecipe(response.data);
        console.log("Success fetching data from Swagger/Recipes");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    //fethhData är en promise, om datan genom vår API request finns att hämta så fylls funktionen med motsvarande.
    // Promise är ett objekt som kommer att visa ett värde (vår recipe array), om informationen i vårt AP finns/är true.
    fetchData();
  }, []);

  return (
    <div>
      <h1>Display Recipes</h1>
      <ul>
        {recipeData.map((recipe) => (
          <li key={recipe._id}>
            <img src={recipe.imageUrl} alt={recipe.title} />
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</li>
              ))}
            </ul>
            <p>{`Time: ${recipe.timeInMins} mins`}</p>
            <p>{`Categories: ${recipe.categories.join(', ')}`}</p>
            <ul>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayRecipes;