import React, { useEffect, useState } from 'react'; 
import { Input } from "antd"; 
import axios from 'axios'; 
import { RecipeInterface } from '../interfaces/RecipeInterface';  
import { Link } from 'react-router-dom'; 
import "../styling/SearchBarStyle.css"; 

function DropDownSearch() {
    const { Search } = Input; // Destructuring Search from Input component
    const [recipeData, setRecipeData] = useState<RecipeInterface[]>([]); // State for storing recipe data
    const [filteredData, setFilteredData] = useState<RecipeInterface[]>([]); // State for storing filtered recipe data
    const [error, setError] = useState(""); // State for storing error messages
    const [input, setInput] = useState(""); // State for storing search input

    useEffect(() => {
        // fetches recipe data when the component is configured via API
        axios('https://sti-java-grupp4-s4yjx9.reky.se/recipes')
            .then((response) => {
                console.log(response.data); // Logging fetched data to console
                setRecipeData(response.data); // Setting fetched data to recipeData state
                setFilteredData(response.data); // Setting fetched data to filteredData state
            })
            .catch((err) => {
                console.log('Error fetching recipes', err); // Logging error message if API call fails
                setError(err); // Setting error message to error state
            });
    }, []);

    // Function to filter recipes based on search input
    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchInput = e.target.value; // Getting search input value
        setInput(searchInput); // Updating input state with search input
        const newFilter = recipeData.filter((recipe) => {
            return recipe.title.toLowerCase().includes(searchInput.toLowerCase()); // Filtering recipes based on search input
        });
        if (searchInput === "") {
            setFilteredData([]); // Resetting filteredData state if search input is empty
            setInput(""); // Resetting input state if search input is empty
            setError(""); // Resetting error state if search input is empty
        } else {
            setFilteredData(newFilter); // Updating filteredData state with filtered recipes
            if (newFilter.length === 0) {
                setError('No recipes found.'); // Setting error message if no recipes found
            } else {
                setError(""); // Clearing error message if recipes are found
            }
        }
    };

    // Function to handle empty search input
    const handleEmptySearch = (value: string) => {
        if (value.trim() === "") {
            setError('To find recipes, type something into the search bar.'); // Setting error message if search input is empty
            return;
        } else {
            setError(''); // Clearing error message if search input is not empty
        }
    };

    return (
        <div className='search-wrapper'>
        <div className="search">
            <div className='searchInputs'>
                <Search
                    placeholder='Search recipes...'
                    value={input}
                    onChange={(e) => handleFilter(e)}
                    onSearch={handleEmptySearch}
                    allowClear
                    enterButton
                
                    
                />
            </div>

            {error && ( // Rendering error message if error state is set
                <div className="error-message">{error}</div>
            )}

            {input !== '' && filteredData.length !== 0 && ( // Rendering filtered recipe data
                <div className='dataResult'>
                    {filteredData.map((recipe) => {
                        return (
                            <div className='dataItem' key={recipe._id}>
                                <Link to={`/recipe/${recipe._id}`} >
                                    {recipe.title}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    </div>
    );
}

export default DropDownSearch;
