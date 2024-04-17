//Bilge

import { useEffect, useRef } from "react";
import "../../styling/SliderStyle.css";
import { useNavigate } from "react-router-dom";
import { RecipeInterface } from "../../interfaces/RecipeInterface";
import globalRecipeFunctions from "../../store/RecipeAPICalls";


const RecipeSlider = () => {
  const { setOneRecipe, recipeList } = globalRecipeFunctions();
  const navigate = useNavigate();
  // Specify the type of elements the ref will refer to - HTMLDivElement in this case
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      
      sliderRef.current?.scrollBy({
        left: window.innerWidth,
        behavior: "smooth",
      });
    }, 8000); // desired autoscroll delay (in milliseconds)

    return () => clearInterval(autoScroll);
  }, [recipeList]);

  const handleNavigate = (recipe: RecipeInterface) => {
    setOneRecipe(recipe);
    navigate(`/recipe/${recipe._id}`);
    window.scrollTo(0,0);
  }

  if(recipeList.length === 0){
    return(
      <div className="slider-section">
        <h1>loading slider...</h1>
      </div>
    )
  }

  return (
    <div className="slider-section"> <h2>Discover Deliciousness</h2>
      <div className="recipe-slider" ref={sliderRef}>
        <div className="slider-container">
          {recipeList.map((recipe) => (
            <div
              key={recipe._id}
              className="image-slide"
              onClick={() => handleNavigate(recipe)}
            >
              <img src={recipe.imageUrl} alt={recipe.title} />
              <div className="cover">{recipe.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeSlider;
