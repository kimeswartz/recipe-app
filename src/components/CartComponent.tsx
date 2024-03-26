import { RecipeInterface } from "../interfaces/RecipeInterface"
import { useNavigate } from "react-router-dom"
import globalCartFunctions from "../state/Cart"
import '../styling/AllRecipeStyle.css'
import allRecipeState from "../state/Endpoints"

const CartComponent = () => {

  const { cart, removeRecipeFromCart } = globalCartFunctions()
  const { setOneRecipe } = allRecipeState();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="centered-tags">
        <div className="info-tag">
          <h1>Varukorgen är tom!</h1>
        </div>
      </div>
    )
  }

  const handleNavigate = (recipe: RecipeInterface) => {
    setOneRecipe(recipe)
    navigate(`/recipe/${recipe._id}`)
    window.scrollTo(0, 0);
  }

  const handleRemoveFromCart = (id: string | undefined) => {
    if(id){
      removeRecipeFromCart(id)
    }
  }

  return (
    <div className="all-recipe">
      {cart.map((cartItem, index) => (
        <div className='all-recipe' key={index}>
          {cartItem.recipeList.map((recipe, recipeKey) => {
            return (
              <div className='recipe-card' key={recipeKey} onClick={() => handleNavigate(recipe)}>
                <div className='first-card-div'>
                  <img className='display-recipe-img' src={recipe.imageUrl} alt={recipe.title} />
                  <b className='card-category'>{recipe.categories[0]}</b>
                </div>
                <div className='second-card-div'>
                  <h2>{recipe.title}</h2>
                  <span>Betyg</span>
                  {recipe.avgRating === null ? <p>inga betyg</p> : <p>{recipe.avgRating?.toFixed(1)}/5</p>}
                  <button onClick={() => handleRemoveFromCart(recipe._id)}>X</button>
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default CartComponent;