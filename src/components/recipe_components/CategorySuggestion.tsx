import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styling/CategoryTagsStyle.css";
import globalRecipeFunctions from "../../store/RecipeAPICalls";

const CategorySuggestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryList, recipeList, fetchAllCategories, fetchOneCategory } =
    globalRecipeFunctions();

  // To fetch all categories when component first loads or when the categoryList changes
  useEffect(() => {
    fetchAllCategories();
  }, [recipeList]);

  // Function to handle a click on a specific category
  const handleCategoryClick = async (categoryName: string) => {
    // Using await to fetch all recipies from specific category before navigating
    await fetchOneCategory(categoryName);
    navigate(`/category/${categoryName}`); // Navigate to category page with selected category
    if (location.pathname === '/recipes') {
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="standard-container">
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
    </section>
  );
};

export default CategorySuggestion;
