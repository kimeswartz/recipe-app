//Hampus

import { RecipeInterface } from "../interfaces/RecipeInterface"
import { useNavigate } from "react-router-dom"
import globalCartFunctions from "../state/Cart"
import '../styling/CartStyle.css'
import allRecipeState from "../state/Endpoints"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import CocktailInterface from "../interfaces/CocktailInterfaces/CocktailInterface"


const CartComponent = () => {

  const { cartRecipes, cartCocktails, displayCart, removeRecipeFromCart, removeCocktailFromCart, toggleCart } = globalCartFunctions()
  const { setOneRecipe } = allRecipeState();
  const navigate = useNavigate();

  if (cartRecipes.length === 0 && cartCocktails.length === 0) {
    return (
      <div className="centered-tags">
        <div className="info-tag">
          <h1>Varukorgen är tom!</h1>
        </div>
      </div>
    )
  }

  const recipeNavigate = (recipe: RecipeInterface) => {
    toggleCart(displayCart)
    setOneRecipe(recipe)
    navigate(`/recipe/${recipe._id}`)
    window.scrollTo(0, 0);
  }

  const cocktailNavigate = (cocktail: CocktailInterface) => {
    toggleCart(displayCart)
    //setOneCocktail
    navigate(`/cocktails/${cocktail.idDrink}`)
    window.scrollTo(0, 0);
  }

  return (
    <div className="flex-box">
      <div className="v-flex-box">
        {cartRecipes.map((recipe, recipeIndex) => {
          return (
            <div className="item-box" key={recipeIndex} >

              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="cart-img"
                onClick={() => recipeNavigate(recipe)}
              />

              <div className="item-info">
                <b>{recipe.title}</b>
                <p className="cart-description">{recipe.description}</p>
              </div>

              <p className="cart-rating">
                <FontAwesomeIcon icon={faStar} className="star-icon" />
                {" "}{recipe.avgRating === null ? <span>0</span> : <span>{recipe.avgRating?.toFixed(1)}</span>}/5
              </p>
              <button className="exit-button" onClick={() => removeRecipeFromCart(recipeIndex)}>X</button>
            </div>
          )
        })}
      </div>
      <div className="v-flex-box">
        {cartCocktails.map((cocktail, cocktailIndex) => {
          return(
            <div className="item-box" key={cocktailIndex}>
              <img 
                src={cocktail.strDrinkThumb} 
                alt={cocktail.strDrink} 
                className="cart-img"
                onClick={() => cocktailNavigate(cocktail)}
              />
              <div className="item-info">
                <b>{cocktail.strDrink}</b>
                <p className="cart-description">{cocktail.strInstructions}</p>
                <p className="cart-rating">{cocktail.strAlcoholic}</p>
              </div>
              <button className="exit-button" onClick={() => removeCocktailFromCart(cocktailIndex)}>X</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CartComponent;