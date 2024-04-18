//Alice 

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import globalRecipeFunctions from "../../store/RecipeAPICalls";

const CategorySuggestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryList, fetchAllCategories, fetchOneCategory } =
    globalRecipeFunctions();

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const handleCategoryClick = async (categoryName: string) => {
    // Using await to fetch all recipies from specific category before navigating
    await fetchOneCategory(categoryName);
    navigate(`/category/${categoryName}`);
    if (location.pathname === "/recipes") {
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="standard-container">
      <div className="tag-grid">
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
