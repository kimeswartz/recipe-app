//Bilge

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import { PiArrowSquareLeftFill,PiArrowSquareRightFill } from "react-icons/pi";
import "../styling/SliderStyle.css"
import { Link } from 'react-router-dom';
import { RecipeInterface } from '../interfaces/RecipeInterface';

const RecipeSlider: React.FC = () => {
  const [randomRecipes, setRandomRecipes] = useState<RecipeInterface[]>([]);

  useEffect(() => {
    getRandomRecipes();
  }, []);

  const getRandomRecipes = async () => {
    try {
      const result = await axios.get<RecipeInterface[]>('https://sti-java-grupp4-s4yjx9.reky.se/recipes');
      const shuffledRecipes = result.data.sort(() => Math.random() - 0.5);
      const selectedRandomRecipes = shuffledRecipes.slice(0, 4); 
      setRandomRecipes(selectedRandomRecipes);
    } catch (error) {
      console.error('Error fetching random recipes', error);
    }
  };


  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div className="custom-prev-arrow" onClick={onClick}>
        <PiArrowSquareLeftFill size={50}/> 
      </div>
    );
  };
  
  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div className="custom-next-arrow" onClick={onClick}>
        <PiArrowSquareRightFill size={50}/> 
      </div>
    );
  };

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
    <div className='recipe-slider'>
      <h2>Inspireras av våra recept</h2>
      {randomRecipes.length > 0 && (
        <Slider {...sliderSettings}>
          {randomRecipes.map((recipe) => 
            <div key={recipe._id} className='image-slide'>
              <Link to={`/recipe/${recipe._id}`}></Link>
              <img src={recipe.imageUrl}/>
              <div className='cover'>{recipe.title}</div>
              
            </div>
          )}
        </Slider>
      )}
    </div>
  );
};

export default RecipeSlider;
