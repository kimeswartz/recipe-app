import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryInterface } from "../interfaces/CategoryInterface";

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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "10px",
      }}
    >
      {categoryList.map((category, index) => (
        <div
          key={index}
          onClick={() => handleCategoryClick(category.name)}
          style={{
            backgroundColor: "lightblue",
            padding: "10px",
            border: "1px solid gray",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default CategorySuggestion;
