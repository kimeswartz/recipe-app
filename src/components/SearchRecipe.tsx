import React, { useEffect, useState } from 'react';
import { Input } from "antd";
import axios from 'axios';
import { RecipeInterface } from '../interfaces/RecipeInterface';
import { Link } from 'react-router-dom';
import "../styling/SearchBarStyle.css";

function SearchRecipe() {
    const { Search } = Input;
    const [recipeData, setRecipeData] = useState<RecipeInterface[]>([]);
    const [filteredData, setFilteredData] = useState<RecipeInterface[]>([]);
    const [error, setError] = useState("");
    const [input, setInput] = useState("");

    useEffect(() => {
        axios('https://sti-java-grupp4-s4yjx9.reky.se/recipes')
            .then((response) => {
                console.log(response.data);
                setRecipeData(response.data);
                setFilteredData(response.data); // Initialize filteredData with all recipes
            })
            .catch((err) => {
                console.log('Error fetching recipes', err);
                setError(err.message); // Set error message if fetching fails
            });
    }, []);

    const handleFilter = (searchInput: string) => {
        const newFilteredData = recipeData.filter((recipe) => {
            const titleMatch = recipe.title.toLowerCase().includes(searchInput.toLowerCase());
            const ingredientMatch = recipe.ingredients.some(ingredient => {
                return ingredient.name.toLowerCase().includes(searchInput.toLowerCase());
            });
            return titleMatch || ingredientMatch;
        });
        setFilteredData(newFilteredData);
        if (newFilteredData.length === 0) {
            setError('No recipes found.'); // Set error message if no recipes match the search
        } else {
            setError(""); // Clear error message if there are matching recipes
        }
    };

    const handleSearch = (value: string) => {
        setInput(value); // Update input state
        if (value.trim() === "") {
            setFilteredData(recipeData); // If search input is empty, show all recipes
            setError('To find recipes, type something into the search bar.'); // Set error message
        } else {
            handleFilter(value);
        }
    };

    return (
        <div className='search-wrapper'>
            <div className="search">
                <div className='searchInputs'>
                    <Search
                        placeholder='Search recipes...'
                        value={input}
                        onChange={(e) => handleSearch(e.target.value)}
                        allowClear
                    />
                </div>

                {error && (
                    <div className="error-message">{error}</div>
                )}

                {filteredData.length !== 0 && (
                    <div className='dataResult'>
                        {filteredData.map((recipe) => {
                            return (
                                <div className='dataItem' key={recipe._id}>
                                    <Link to={`/recipe/${recipe._id}`} >
                                        <h3>{recipe.title}</h3>
                                    </Link>
                                    <p>Ingredients: {recipe.ingredients.map(ingredient => ingredient.name).join(', ')}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchRecipe;
