import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styling/CategoryTagsStyle.css";
import allRecipeState from "../../state/Endpoints";

const CategorySuggestion = () => {
  const navigate = useNavigate();
  const { categoryList, recipeList, fetchAllCategories, fetchOneCategory } =
    allRecipeState();

  // To fetch all categories when component first loads or when the categoryList changes
  useEffect(() => {
    fetchAllCategories();
  }, [recipeList]);

  // Function to handle a click on a specific category
  const handleCategoryClick = async (categoryName: string) => {
    // Using await to fetch all recipies from specific category before navigating
    await fetchOneCategory(categoryName);
    navigate(`/category/${categoryName}`); // Navigate to category page with selected category
  };

  return (
    <div className="tag-grid category-suggestion-container">
      {categoryList.map((category, index) => (
        <div
          key={index}
          onClick={() => handleCategoryClick(category)}
          className="recipe-tag category"
        >
          <div className="tag-div">
            <h3>{category}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySuggestion;
