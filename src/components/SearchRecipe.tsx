import { useState, useEffect } from 'react';
import { RecipeInterface } from '../interfaces/RecipeInterface';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import "../styling/SearchBox.css"

const RecipeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState<RecipeInterface[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeInterface[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<RecipeInterface[]>('https://sti-java-grupp4-s4yjx9.reky.se/recipes');
        setRecipes(result.data);
      } catch (error) {
        console.error('Error fetching recipes', error);
        setErrorMessage('Could not fetch recipes.');
      }
    };
    fetchData();
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
    setErrorMessage(filtered.length === 0 && term.trim() !== '' ? 'No recipes found.' : '');
  };

  const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      setErrorMessage('To find recipes, type something into the search bar.')
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
    <div className='search'>
      <div className='searchInputs'>
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={handleSearch}>
          <input
            className='search-box'
            type='text'
            placeholder='Search'
            onChange={onChange}
            value={searchTerm}
          />
          <button type="button" onClick={handleClear}>x</button>
          <button onSubmit={handleSearch}><FaSearch /></button>
        </form>
      </div>
      <div className='recipe-list'>    
        {filteredRecipes.map((recipe) => (
          <div key={recipe._id}>
            <Link to={`/recipe/${recipe._id}`}>
              {recipe.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
