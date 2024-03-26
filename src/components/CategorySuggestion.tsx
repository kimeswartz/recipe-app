import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styling/CategorySuggestionStyle.css";
import allRecipeState from "../state/Endpoints";

const CategorySuggestion = () => {
  const navigate = useNavigate();
  const { categoryList, fetchAllCategories } = allRecipeState();

  // To fetch all categories when component first loads or when the categoryList changes
  useEffect(() => {
    fetchAllCategories();
  }, []);

  // Function to handle a click on a specific category
  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${categoryName}`); // Navigate to category page with selected category
  };

  return (
    <div className="category-suggestion-container">
      {categoryList.map((category, index) => (
        // Rendering each category item with click handler
        <div
          key={index}
          onClick={() => handleCategoryClick(category.name)}
          className="category"
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default CategorySuggestion;
