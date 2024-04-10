// Hampus

import { RecipeInterface } from "../interfaces/RecipeInterface"
import { useNavigate } from "react-router-dom"
import globalCartFunctions from "../store/GlobalCart"
import '../styling/CartStyle.css'
import globalRecipeFunctions from "../store/RecipeAPICalls"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import CocktailInterface from "../interfaces/CocktailInterface";
import globalCocktailFunctions from "../store/CocktailAPICalls"

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
    setOneCocktail(cocktail)
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
          <li key={i} className="ingredient-name">
            {cocktail[ingredientKey]}
          </li>
        );
      }
    }
    return ingredientsList;
  }

  const totalItemsInCart = cartRecipes.reduce((total, recipe) => total + recipe.quantity, 0) + cartCocktails.reduce((total, cocktail) => total + cocktail.quantity, 0);
  const totalRecipePrice = cartRecipes.reduce(
    (accumulator, currentValue) => accumulator + currentValue.recipe.price * currentValue.quantity,
    0
  );

  if (totalItemsInCart === 0) {
    return (
      <div className="centered-tags">
        <div className="info-tag">
          <h3>Nothing added yet!</h3>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Total items: {totalItemsInCart}</h2>
      <h2>Total recipe cost: {totalRecipePrice}</h2>
      <div className="flex-box">
        {/* Presents all recipes */}
        <div className="v-flex-box">
          {cartRecipes.map((cartItem, recipeIndex) => {
            const { recipe, quantity } = cartItem;
            return (
              <div className="item-box" key={recipeIndex}>
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="cart-img"
                  onClick={() => recipeNavigate(recipe)}
                />

                <div className="item-info scroll-window">
                  <b>{recipe.title}</b>
                  <ul className="list-objects">
                    {recipe.ingredients.map((ingredient, indexKey) => (
                      <li key={indexKey} className="ingredient-name">
                        {ingredient.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="cart-rating">
                  <FontAwesomeIcon icon={faStar} className="star-icon" />{" "}
                  {recipe.avgRating === null ? (
                    <span>0</span>
                  ) : (
                    <span>{recipe.avgRating?.toFixed(1)}</span>
                  )}
                  /5
                </p>
                <button
                  className="exit-button"
                  onClick={() => removeRecipeFromCart(recipeIndex)}
                >
                  Delete
                </button>
                
                <button 
                    className="q-button" 
                    onClick={() => increaseRecipeQuantity(recipeIndex)}>+</button>
                    <span>{quantity}</span>
                <button
                  className="q-button" 
                  onClick={() => decreaseRecipeQuantity(recipeIndex)}>-</button>
                
              </div>
            );
          })}
        </div>

        {/* Presents all cocktails */}
        <div className="v-flex-box">
          {cartCocktails.map((cartItem, cocktailIndex) => {
            const { cocktail, quantity } = cartItem;
            return (
              <div className="item-box" key={cocktailIndex}>
                <img
                  src={cocktail.strDrinkThumb}
                  alt={cocktail.strDrink}
                  className="cart-img"
                  onClick={() => cocktailNavigate(cocktail)}
                />
                <div className="item-info scroll-window">
                  <b>{cocktail.strDrink}</b>
                  <ul className="list-objects" >
                    {generateIngredientsList(cocktail)}
                  </ul>

                </div>
                <button
                  className="exit-button"
                  onClick={() => removeCocktailFromCart(cocktailIndex)}
                >
                  Delete
                </button>
                
                <button
                  className="q-button"
                    onClick={() => increaseCocktailQuantity(cocktailIndex)}>+
                </button>
                    <span>{quantity}</span>
                <button
                    className="q-button"
                    onClick={() => decreaseCocktailQuantity(cocktailIndex)}>-
                </button>
                
                <b className="cart-rating">
                  {cocktail.strAlcoholic}
                </b>
              </div>
            );
          })}
        </div>
      </div>
    </div>

  );
};

export default CartComponent;
