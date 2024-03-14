import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams hook to access route parameters
import { RecipeInterface } from "../interfaces/RecipeInterface";
import "../styling/styleRecipiesByCategory.css";

const RecipesByCategory = () => {
  const URL = "https://sti-java-grupp4-s4yjx9.reky.se";
  const { categoryName } = useParams(); // access categoryName parameter from the route URL
  const [recipeList, setRecipeList] = useState<RecipeInterface[]>([]);
  const navigate = useNavigate();

  // Gets all the recipes from the category
  useEffect(() => {
    fetchRecipesByCategory();
  }, []);

  const fetchRecipesByCategory = async () => {
    try {
      const response = await axios.get(
        `${URL}/categories/${categoryName}/recipes`
      );
      if (response.status === 200) {
        setRecipeList(response.data);
      }
    } catch (error) {
      console.error("Error fetching recipes by category:", error);
      setRecipeList([]);
    }
  };

  const handleRecipeClick = async (recipeId: string) => {
    navigate(`/Recipe/${recipeId}`);
  };

  return (
    <div className="recipe-container">
      <button onClick={() => navigate("/")}>Tillbaka</button>
      <h1>Recipes in category: {categoryName}</h1>
      <div className="recipe-list">
        {recipeList.map((recipe, index) => (
          <div key={index} className="recipe-item" onClick={() => handleRecipeClick(recipe._id)}>
            <div className="text-container">
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
            </div>
            <div className="img-container">
              <img src={recipe.imageUrl} alt={recipe.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesByCategory;
