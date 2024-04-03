import { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import { PiArrowSquareLeftFill, PiArrowSquareRightFill } from "react-icons/pi";
import "../styling/SliderStyle.css" 
import { useNavigate } from 'react-router-dom'; // Importera useNavigate här
import { RecipeInterface } from '../interfaces/RecipeInterface';

const RecipeSlider = () => {
  
  const [randomRecipes, setRandomRecipes] = useState<RecipeInterface[]>([]);
  const navigate = useNavigate(); // Använd useNavigate för att få navigationsfunktionen

  useEffect(() => {
    // Fetch random recipes when component mounts
    getRandomRecipes();
  }, []);
  
  const getRandomRecipes = async () => {
    try {
      // Fetch recipes from the API
      const result = await axios.get<RecipeInterface[]>('https://sti-java-grupp4-s4yjx9.reky.se/recipes');
      const shuffledRecipes = result.data.sort(() => Math.random() - 0.5);
      shuffledRecipes.slice(0, 8); 
      setRandomRecipes(shuffledRecipes);
    } catch (error) {
      // Handle errors if fetching fails
      console.error('Error fetching random recipes', error);
    }
  };


  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      // Custom previous arrow component
      <div className="custom-prev-arrow" onClick={onClick}>
        <PiArrowSquareLeftFill size={50}/> 
      </div>
    );
  };
  
  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      // Custom next arrow component
      <div className="custom-next-arrow" onClick={onClick}>
        <PiArrowSquareRightFill size={50}/> 
      </div>
    );
  };

  // Configuration settings for the slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <CustomPrevArrow />, 
    nextArrow: <CustomNextArrow />
  };

  return (
    // Wrapper for the recipe slider
    <div className='recipe-slider'>
      <h2>Inspireras av våra recept</h2>
      {randomRecipes.length > 0 && (
        <Slider {...sliderSettings}> 
          {/* Map through random recipes and render each as a slide */}
          {randomRecipes.map((recipe) => 
            <div key={recipe._id} className='image-slide'>
              <div onClick={() => navigate(`/recipe/${recipe._id}`)}> {/* Använd navigate här */}
                <img src={recipe.imageUrl} alt={recipe.title}/> {/* Image for the recipe */}
                <div className='cover'>{recipe.title}</div> {/* Title for the recipe */}
              </div>
            </div>
          )}
        </Slider>
      )}
    </div>
  );
};

export default RecipeSlider;
