import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import globalCartFunctions from "../../store/GlobalCart";
import globalCocktailFunctions from "../../store/CocktailAPICalls";
import "../../styling/OneRecipePageStyle.css";

const DisplayOneCocktail = () => {
  const { oneCocktail, fetchCocktailById } = globalCocktailFunctions();
  const { addCocktailToCart } = globalCartFunctions();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchCocktailById(id);
    }
  }, [id, fetchCocktailById]);

  const handleClick = (name: string) => {
    navigate(`/ingredient/${name}`);
    window.scrollTo(0, 0);
  };

  const generateIngredientsList = (cocktail: {
    [ingredientName: string]: any;
  }) => {
    const ingredientsList = [];

    for (let i = 1; i <= 15; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;
      const ingredientName = cocktail[ingredientKey];
      const measure = cocktail[measureKey];
      if (ingredientName) {
        const imageUrl = `https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Small.png`;
        ingredientsList.push(
          <li key={i} onClick={() => handleClick(ingredientName)} className="pointer recipe-tag">
            <img src={imageUrl} alt={ingredientName} />
            {ingredientName} : {measure ? `${measure} ` : "To taste"}
          </li>
        );
      }
    }
    return ingredientsList;
  };

  return (
    <>
      <section className="standard-container">
        <div className="flex-header-container">
          <div className="text-container">
            <h1>{oneCocktail.strDrink}</h1>
            <div className=".centered-container">
              {oneCocktail.strCategory && (
                <p>
                  <strong>Category:</strong> {oneCocktail.strCategory}
                </p>
              )}
              {oneCocktail.strIBA && <p>Collection: {oneCocktail.strIBA}</p>}
              {oneCocktail.strAlcoholic && (
                <p>
                  <strong>{oneCocktail.strAlcoholic}</strong>
                </p>
              )}
              {oneCocktail.strGlass && (
                <p>
                  <strong>Serve in:</strong> {oneCocktail.strGlass}
                </p>
              )}

              <div className="button-container">
                <button
                  className="main-button"
                  onClick={() => addCocktailToCart(oneCocktail)}
                >
                  Add to List
                </button>
              </div>
            </div>
          </div>

          <div className="img-container">
            <img src={oneCocktail.strDrinkThumb} alt={oneCocktail.strDrink} />
          </div>
        </div>
      </section>

      <div className="standard-container">
        <div className="upper">
          <h2>You need...</h2>
        </div>

        <div className="lower">
          <div className="centered-tags">
            <ul className="list-objects">
              {generateIngredientsList(oneCocktail)}
            </ul>
          </div>
        </div>
      </div>
      <div className="standard-container">
        <div className="centered-mobile">
          <h2>How to make it...</h2>
          <div className="centered-container">
            <p className="to-do-step">{oneCocktail.strInstructions}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayOneCocktail;
