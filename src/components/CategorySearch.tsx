import axios from "axios";
import { useEffect, useState } from "react";
import { categoryInterface } from "../interfaces/CategoryInterface";
import { RecipeInterface } from "../interfaces/RecipeInterface";

interface CategorySearchProps {
  onSelectRecipe: (recipeId: string) => void;
}

const CategorySearch: React.FC<CategorySearchProps> = ({ onSelectRecipe }) => {
  const URL = 'https://sti-java-grupp4-s4yjx9.reky.se';
  const [categoryList, setCategoryList] = useState<categoryInterface[]>([]);
  const [recipeList, setRecipeList] = useState<RecipeInterface[]>([]);
  const [inputCategory, setInputCategory] = useState('');

  //Grabs all categories and puts them inside a list
  const getAllCategories = async () => {
    try {
      const response = await axios.get(`${URL}/categories`);

      if (response.status === 200) {
        setCategoryList(response.data);
      }
    } catch (error) {
      console.error('error fetching categories: ', error);
      setCategoryList([]);
    }
  };

  //Grabs all recipes from inputed category and puts them inside a list
  const findRecipesByCategory = async () => {
    try {
      const response = await axios.get(`${URL}/categories/${inputCategory}/recipes`);

      if (response.status === 200) {
        setRecipeList(response.data);
      }
    } catch (error) {
      console.error('Error fetching category:', error);
      setRecipeList([]);
    }
  };

  //Handle select element changes
  const handleSelectCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputCategory(e.target.value);
  };

  //Runs once to grab all categories
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div>
      <div className="flex-container">
        <div>
          <select name="category" id="category" value={inputCategory} onChange={handleSelectCategoryChange}>
            <option value="" selected disabled hidden></option>
            {categoryList.map((category) => (
              <option key={category.name} value={category.name}>{category.name}</option>
            ))}
          </select>
          <button onClick={() => findRecipesByCategory()}>Find recipes</button>
          <ul>
            {recipeList.map((recipe) => (
              <li key={recipe._id} onClick={() => onSelectRecipe(recipe._id)}>{recipe.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategorySearch;