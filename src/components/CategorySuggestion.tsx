import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { categoryInterface } from '../interfaces/CategoryInterface';
import { RecipeInterface } from '../interfaces/RecipeInterface';

const CategorySuggestion = () => {
    const URL = 'https://sti-java-grupp4-s4yjx9.reky.se';
    const [categoryList, setCategoryList] = useState<categoryInterface[]>([]);
    const [recipeList, setRecipeList] = useState<RecipeInterface[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    //Runs once to grab all categories
    useEffect(() => {
        getAllCategories();
    }, []);

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

    const handleCategoryClick = async (categoryName: string) => {
        setSelectedCategory(categoryName);
        await findRecipesByCategory(categoryName);
    };

    const findRecipesByCategory = async (categoryName: string) => {
        try {
            const response = await axios.get(`${URL}/categories/${categoryName}/recipes`);
            if (response.status === 200) {
                setRecipeList(response.data);
            }
        } catch (error) {
            console.error('Error fetching category:', error);
            setRecipeList([]);
        }
    };

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
                {categoryList.map((category, index) => (
                    <div key={index} onClick={() => handleCategoryClick(category.name)} style={{ backgroundColor: 'lightblue', padding: '10px', border: '1px solid gray', borderRadius: '5px', cursor: 'pointer' }}>
                        {category.name}
                    </div>
                ))}
            </div>
            <h3>Recipes from {selectedCategory}</h3>
            <ul>
                {recipeList.map((recipe, index) => (
                    <li key={index}>{recipe.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategorySuggestion;
