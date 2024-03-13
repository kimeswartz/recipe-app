import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SearchInterface } from '../interfaces/SearchInterface';

const RecipeSlider: React.FC = () => {
  const [randomRecipes, setRandomRecipes] = useState<SearchInterface[]>([]);

  useEffect(() => {
    getRandomRecipes();
  }, []);

  const getRandomRecipes = async () => {
    try {
      const result = await axios.get<SearchInterface[]>('https://sti-java-grupp4-s4yjx9.reky.se/recipes');
      const shuffledRecipes = result.data.sort(() => Math.random() - 0.5);
      const selectedRandomRecipes = shuffledRecipes.slice(0, 4); 
      setRandomRecipes(selectedRandomRecipes);
    } catch (error) {
      console.error('Error fetching random recipes', error);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <div className='recipe-slider'>
      <h2>Random Recipes</h2>
      {randomRecipes.length > 0 && (
        <Slider {...sliderSettings}>
          {randomRecipes.map((recipe) => (
            <div key={recipe.id}>
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                title={recipe.title} 
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default RecipeSlider;
