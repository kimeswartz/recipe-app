import axios from "axios";
import { useEffect, useState } from "react";
import CocktailInterface from "../../interfaces/CocktailInterface";
import Slider from "react-slick";

function CocktailSlider() {
  const [randomCocktail, setRandomCocktail] = useState<CocktailInterface[]>([]);

  const fetchData = async () => {
    try {
      const requests = Array.from({ length: 5 }, () =>
        axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      );
      const responses = await Promise.all(requests);
      const cocktailData = responses.map((response) => response.data.drinks[0]);
      setRandomCocktail(cocktailData);
      console.log("Fetching data from Cocktail API", cocktailData);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Configuration settings for the slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <>
      <Slider {...sliderSettings}>
        {randomCocktail.map((drink, index) => {
          return (
            <div key={index}>
              <h2>{drink.strDrink}</h2>
              <img src={drink.strDrinkThumb} alt={drink.strDrink} />
            </div>
          );
        })}
      </Slider>
    </>
  );
}
export default CocktailSlider;
