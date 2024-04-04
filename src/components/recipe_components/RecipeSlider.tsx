import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../styling/SliderStyle.css";
import { useNavigate } from "react-router-dom";
import { RecipeInterface } from "../../interfaces/RecipeInterface";


const RecipeSlider = () => {
  const [randomRecipes, setRandomRecipes] = useState<RecipeInterface[]>([]);
  const navigate = useNavigate();
  // Specify the type of elements the ref will refer to - HTMLDivElement in this case
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getRandomRecipes = async () => {
      try {
        const result = await axios.get<RecipeInterface[]>(
          "https://sti-java-grupp4-s4yjx9.reky.se/recipes"
        );
        // Make sure to actually update the state with the sliced array
        const shuffledRecipes = result.data
          .sort(() => Math.random() - 0.5)
          .slice(0, 20);
        setRandomRecipes(shuffledRecipes);
      } catch (error) {
        console.error("Error fetching random recipes", error);
      }
    };

    getRandomRecipes();
  }, []);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      sliderRef.current?.scrollBy({
        left: window.innerWidth,
        behavior: "smooth",
      });
    }, 8000); // desired autoscroll delay (in milliseconds)

    return () => clearInterval(autoScroll);
  }, []);

  return (
    <div className="slider-section"> <h2>Discover Deliciousness</h2>
      <div className="recipe-slider" ref={sliderRef}>
        <div className="slider-container">
          {randomRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="image-slide"
              onClick={() => navigate(`/recipe/${recipe._id}`)}
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
