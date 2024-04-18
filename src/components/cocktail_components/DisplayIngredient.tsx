//Bilge

import { useEffect } from "react";
import globalCocktailFunctions from "../../store/CocktailAPICalls";
import "../../styling/cocktail_css/CocktailGrid.css";
import "../../styling/cocktail_css/CocktailIngredient.css";
import { useNavigate, useParams } from "react-router-dom";
import CocktailInterface from "../../interfaces/cocktail_interfaces/CocktailInterface";

const DisplayIngredient = () => {
  const {
    cocktailsByIngredient,
    fetchCocktailsByIngredient,
    oneIngredient,
    setOneCocktail,
    fetchIngredient,
  } = globalCocktailFunctions();
  const navigate = useNavigate();
  const { ingredientId } = useParams<{ ingredientId?: string }>();

  useEffect(() => {
    console.log("ingredientId:", ingredientId);
    if (ingredientId && ingredientId.trim() !== "") {
      fetchIngredient(ingredientId.trim());
      fetchCocktailsByIngredient(ingredientId.trim());
    }
  }, [ingredientId, fetchIngredient, fetchCocktailsByIngredient]);

  const handleClick = (cocktail: CocktailInterface) => {
    setOneCocktail(cocktail);
    navigate(`/cocktail/${cocktail.idDrink}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <section className="standard-container">
        <div className="flex-header-container">
          <div className="text-container">
            {oneIngredient.strIngredient && (
              <h1>{oneIngredient.strIngredient}</h1>
            )}
            <div className="ingredient-desc">
              {oneIngredient.strDescription && (
                <p>{oneIngredient.strDescription}</p>
              )}
            </div>
          </div>
          <div className="img-container">
            <img
              src={`https://www.thecocktaildb.com/images/ingredients/${oneIngredient.strIngredient}.png`}
              alt={oneIngredient.strIngredient}
              className="ingredient-img"
            />
          </div>
        </div>
      </section>
      <section className="standard-container green-background">
        <div className="cocktail-grid">
          <ul className="cocktail-list">
            {cocktailsByIngredient.map((cocktail, cocktailKey) => (
              <ul
                key={cocktailKey}
                className="cocktail-card pointer"
                onClick={() => handleClick(cocktail)}
              >
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                <h3>{cocktail.strDrink}</h3>
              </ul>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default DisplayIngredient;
