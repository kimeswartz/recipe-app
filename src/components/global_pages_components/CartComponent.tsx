import { RecipeInterface } from "../../interfaces/recipe_interfaces/RecipeInterface";
import { useNavigate } from "react-router-dom";
import globalCartFunctions from "../../store/global_cart/GlobalCart";
import globalRecipeFunctions from "../../store/recipes_store/RecipeAPICalls";
import CocktailInterface from "../../interfaces/cocktails_interfaces/CocktailInterface";
import globalCocktailFunctions from "../../store/cocktails_store/CocktailAPICalls";

import "../../styling/CardsStyle.css";

const CartComponent = () => {
  const {
    cartRecipes,
    cartCocktails,
    displayCart,
    removeRecipeFromCart,
    removeCocktailFromCart,
    toggleCart,
    increaseRecipeQuantity,
    decreaseRecipeQuantity,
    increaseCocktailQuantity,
    decreaseCocktailQuantity,
  } = globalCartFunctions();
  const { setOneRecipe } = globalRecipeFunctions();
  const { setOneCocktail } = globalCocktailFunctions();
  const navigate = useNavigate();

  const recipeNavigate = (recipe: RecipeInterface) => {
    toggleCart(displayCart);
    setOneRecipe(recipe);
    navigate(`/recipe/${recipe._id}`);
    window.scrollTo(0, 0);
  };

  const cocktailNavigate = (cocktail: CocktailInterface) => {
    toggleCart(displayCart);
    setOneCocktail(cocktail);
    navigate(`/cocktail/${cocktail.idDrink}`);
    window.scrollTo(0, 0);
  };

  const generateIngredientsList = (cocktail: {
    [ingredientName: string]: any;
  }) => {
    const ingredientsList = [];

    for (let i = 1; i <= 15; i++) {
      const ingredientKey = `strIngredient${i}`;
      if (cocktail[ingredientKey]) {
        ingredientsList.push(
          <li key={i} className="cart-ingredient">
            {cocktail[ingredientKey]}
          </li>
        );
      }
    }

    return ingredientsList;
  };

  const totalItemsInCart =
    cartRecipes.reduce((total, recipe) => total + recipe.quantity, 0) +
    cartCocktails.reduce((total, cocktail) => total + cocktail.quantity, 0);
  const totalRecipePrice = cartRecipes.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.recipe.price * currentValue.quantity,
    0
  );

  if (totalItemsInCart === 0) {
    return (
      <div className="centered-container">
        <h3>Nothing added yet!</h3>
      </div>
    );
  }

  return (
    <section className="standard-container">
      <div className="centered-container">
        <h2>Total items: {totalItemsInCart}</h2>
        <p>
          Total recipe cost: <strong>{totalRecipePrice}</strong> btc
        </p>
      </div>

      <div className="card-grid">
        {cartRecipes.map((cartItem, recipeIndex) => {
          const { recipe, quantity } = cartItem;

          return (
            <div className="recipe-card" key={recipeIndex}>
              <div className="first-card-div">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="display-recipe-img"
                  onClick={() => recipeNavigate(recipe)}
                />

                <div className="second-card-div">
                  <div className="centered-container">
                    <h3>{recipe.title}</h3>

                    <span>{quantity}</span>

                    <div className="flex-container">
                      <button
                        className="main-button"
                        onClick={() => increaseRecipeQuantity(recipeIndex)}
                      >
                        +
                      </button>

                      <button
                        className="main-button"
                        onClick={() => decreaseRecipeQuantity(recipeIndex)}
                      >
                        -
                      </button>
                    </div>

                    <div className="spacer-container">
                      <button
                        className="main-button"
                        onClick={() => removeRecipeFromCart(recipeIndex)}
                      >
                        Delete from my list
                      </button>
                    </div>
                  </div>
                  <h4>You need:</h4>
                  <ul className="centered-objects">
                    {recipe.ingredients.map((ingredient, indexKey) => (
                      <li key={indexKey} className="cart-ingredient">
                        {ingredient.name},
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}

        {cartCocktails.map((cartItem, cocktailIndex) => {
          const { cocktail, quantity } = cartItem;

          return (
            <div className="recipe-card" key={cocktailIndex}>
              <div className="first-card-div">
                <img
                  src={cocktail.strDrinkThumb}
                  alt={cocktail.strDrink}
                  className="display-recipe-img"
                  onClick={() => cocktailNavigate(cocktail)}
                />

                <div className="second-card-div">
                  <div className="centered-container">
                    <h3>{cocktail.strDrink}</h3>

                    <span>{quantity}</span>

                    <div className="flex-container">
                      <button
                        className="main-button"
                        onClick={() => increaseCocktailQuantity(cocktailIndex)}
                      >
                        +
                      </button>

                      <button
                        className="main-button"
                        onClick={() => decreaseCocktailQuantity(cocktailIndex)}
                      >
                        -
                      </button>
                    </div>

                    <div className="spacer-container">
                      <button
                        className="main-button"
                        onClick={() => removeCocktailFromCart(cocktailIndex)}
                      >
                        Delete from my list
                      </button>
                    </div>
                  </div>

                  <h4>You need:</h4>
                  <ul className="list-objects">
                    <li>{generateIngredientsList(cocktail)}</li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CartComponent;
