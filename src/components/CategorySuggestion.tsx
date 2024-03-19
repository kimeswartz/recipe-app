import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryInterface } from "../interfaces/CategoryInterface";
import "../styling/CategorySuggestionStyle.css";

const CategorySuggestion = () => {
  const URL = "https://sti-java-grupp4-s4yjx9.reky.se";
  const [categoryList, setCategoryList] = useState<categoryInterface[]>([]);
  const navigate = useNavigate();

  // Runs once to grab all categories
  useEffect(() => {
    getAllCategories();
  }, []);

  // Gets all the categories from the api
  const getAllCategories = async () => {
    try {
      const response = await axios.get(`${URL}/categories`);

      if (response.status === 200) {
        setCategoryList(response.data);
      }
    } catch (error) {
      console.error("error fetching categories: ", error);
      setCategoryList([]);
    }
  };

  // When clicked this function navigates to a different page with the specific category clicked
  const handleCategoryClick = async (categoryName: string) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="category-suggestion-container">
      {categoryList.map((category, index) => (
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
