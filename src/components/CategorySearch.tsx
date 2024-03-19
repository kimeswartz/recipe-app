import axios from "axios";
import { useEffect, useState } from "react";
import { categoryInterface } from "../interfaces/CategoryInterface";
import { RecipeInterface } from "../interfaces/RecipeInterface";

import "../styling/CategorySearchStyle.css"

const CategorySearch = () => {

  const URL = 'https://sti-java-grupp4-s4yjx9.reky.se'
  const [categoryList, setCategoryList] = useState<categoryInterface[]>([])
  const [recipeList, setRecipeList] = useState<RecipeInterface[]>([])
  const [inputCategory, setInputCategory] = useState('');

  //Grabs all categories and puts them inside a list
  const getAllCategories = async () => {
    try {
      const response = await axios.get(`${URL}/categories`)

      if (response.status === 200) {
        setCategoryList(response.data);
      }
    } catch (error) {
      console.error('error fetching categories: ', error)
      setCategoryList([])
    }

  }

  //Grabs all recipes from inputed category and puts them inside a list
  const findRecipesByCategory = async () => {
    try {
      const response = await axios.get(`${URL}/categories/${inputCategory}/recipes`)
      if (response.status === 200) {
        setRecipeList(response.data)
      }
    } catch (error) {
      console.error('Error fetching category:', error)
      setRecipeList([])
    }
  }

  //Handle select element changes
  const handleSelectCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputCategory(e.target.value)
  }

  //Runs once to grab all categories
  useEffect(() => {
    getAllCategories()
  }, [])


  return (
    <div>
      <div className="flex-container">
        <div>
          <select name="category" id="category" value={inputCategory} onChange={handleSelectCategoryChange}>
            <option value="" selected disabled hidden></option>
            {categoryList.map((category) => {
              {/*Maping each category from all categories in the API*/ }
              return (
                <option value={category.name}>{category.name}</option>
              )
            })}
          </select>
          <button onClick={() => findRecipesByCategory()}>Find recipes</button>
          <ul>
            {recipeList.map((recipe) => (<li>{recipe.title}</li>))}  {/*Maping each recipe from selected category*/}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CategorySearch