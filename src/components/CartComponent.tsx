//Hampus

import { RecipeInterface } from "../interfaces/RecipeInterface"
import { useNavigate } from "react-router-dom"
import globalCartFunctions from "../state/Cart"
import '../styling/CartStyle.css'
import allRecipeState from "../state/Endpoints"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


const CartComponent = () => {

  const { cartRecipes, displayCart, removeRecipeFromCart, toggleCart } = globalCartFunctions()
  const { setOneRecipe } = allRecipeState();
  const navigate = useNavigate();

  if (cartRecipes.length === 0) {
    return (
      <div className="centered-tags">
        <div className="info-tag">
          <h1>Varukorgen är tom!</h1>
        </div>
      </div>
    )
  }

  const handleNavigate = (recipe: RecipeInterface) => {
    toggleCart(displayCart)
    setOneRecipe(recipe)
    navigate(`/recipe/${recipe._id}`, { state: recipe })
    window.scrollTo(0, 0);
  }

  const handleRemoveFromCart = (positionInArray: number) => {
    removeRecipeFromCart(positionInArray)
  }

  return (
    <div className="flex-box">
      <div className="v-flex-box">
        {cartRecipes.map((recipe, recipeIndex) => {
          return (
            <div className="recipe-box" key={recipeIndex} >

              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="cart-img"
                onClick={() => handleNavigate(recipe)}
              />

              <div className="recipe-info">
                <b>{recipe.title}</b>
                <p className="cart-description">{recipe.description}</p>
              </div>

              <p className="cart-rating">
                <FontAwesomeIcon icon={faStar} className="star-icon" />
                {" "}{recipe.avgRating === null ? <span>0</span> : <span>{recipe.avgRating?.toFixed(1)}</span>}/5
              </p>
              <button className="exit-button" onClick={() => handleRemoveFromCart(recipeIndex)}>X</button>
            </div>
          )
        })
        }
      </div>
      <div className="v-flex-box">
        {/* Put cocktail logic here */}
      </div>
    </div>
  )
}

export default CartComponent;