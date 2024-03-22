import React, { useEffect, useState } from 'react'; 
import { Input } from "antd"; 
import axios from 'axios'; 
import { RecipeInterface } from '../interfaces/RecipeInterface';  
import { Link } from 'react-router-dom'; 
import "../styling/SearchBarStyle.css"; 

function SearchRecipe() {
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

  useEffect(() => {
    filterRecipes(searchTerm);
  }, [searchTerm]);

  const onChange = (e: { target: { value: any; }; })  => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const filterRecipes = (term: string) => {
    const lowerCaseTerm = term.toLowerCase();
    const filtered = recipes.filter((recipe) => recipe.title.toLowerCase().includes(lowerCaseTerm));
    setFilteredRecipes(filtered);
    // Set error message if no recipes found
    setErrorMessage(filtered.length === 0 && term.trim() !== '' ? 'Inga recept hittades' : '');
  };

  const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      setErrorMessage('Skriv in ditt recept och klicka på sök!')
      return;
    } else {
      setErrorMessage('')
      filterRecipes(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilteredRecipes([]);
    setErrorMessage('');
  };

    return (
        <section className='search-wrapper'>
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
                <ul className='dataResult'>
                {filteredData.map((recipe) => (
                    <li className='dataItem' key={recipe._id}>
                        <Link to={`/recipe/${recipe._id}`}>
                            {recipe.title}
                        </Link>
                    </li>
                ))}
            </ul>
            
            )}
        </div>
    </section>
    );
}

export default SearchRecipe;
