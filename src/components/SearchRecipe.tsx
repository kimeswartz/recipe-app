import { useEffect, useState } from 'react';
import allRecipeState from '../state/Endpoints';
import { useNavigate } from 'react-router-dom';
import "../styling/SearchRecipe.css"
import "../styling/AllRecipeStyle.css"
import { RecipeInterface } from '../interfaces/RecipeInterface';

const SearchRecipe = () => {
  const { recipeList, fetchAllRecipes, setOneRecipe } = allRecipeState();
  const [searchTerms, setSearchTerms] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const handleNavigate = (recipe: RecipeInterface) => {
    setOneRecipe(recipe);
    navigate(`/recipe/${recipe._id}`);
  }

  // Function to split search terms and filter recipes based on all search terms
  const filteredRecipes = recipeList.filter(recipe =>
    searchTerms.split(' ').every(term =>
      recipe.title.toLowerCase().includes(term.toLowerCase())
    )
  );

  const performSearch = () => {
    setSearchPerformed(true);
    // Clear suggestions when performing search
    setSuggestions([]);
  };

  const handleSuggestionClick = (value: string) => {
    setSearchTerms(value);
    // Clear suggestions and perform search when suggestion is clicked
    setSuggestions([]);
    performSearch();
  };

  const handleInputChange = (value: string) => {
    setSearchTerms(value);
    // Generate suggestions based on current search term
    if (value.trim() === '') {
      setSuggestions([]);
      setSearchPerformed(false); // Reset searchPerformed when input is empty
    } else {
      generateSuggestions(value);
    }
  };

  // Function to generate suggestions based on current search term
  const generateSuggestions = (value: string) => {
    // For simplicity, let's just filter recipe titles for suggestions
    const filteredSuggestions = recipeList
      .filter(recipe => recipe.title.toLowerCase().includes(value.toLowerCase()))
      .map(recipe => recipe.title);
    setSuggestions(filteredSuggestions);
  };

  const handleClearSearch = () => {
    setSearchTerms('');
    setSearchPerformed(false);
    setSuggestions([]);
  };

  return (
    <>
      <div className='search-bar'>
        <input
          type='text'
          value={searchTerms}
          placeholder='Search recipes...'
          onChange={(e) => handleInputChange(e.target.value)}
        />
        {searchTerms.trim() !== '' ? (
          <button onClick={handleClearSearch}>Clear</button>
        ) : (
          <button onClick={performSearch}>Search</button>
        )}

        {searchTerms.trim() !== '' && ( // Only render suggestions if search term is not empty or whitespace
          <div className='suggestions'>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className='suggestion'
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      {searchPerformed && searchTerms.trim() !== '' && ( // Only render recipes if a search has been performed and search term is not empty
        <div className='all-recipe'>
          {filteredRecipes.map((recipe) => {
            return (
              <div className='recipe-card' key={recipe._id} onClick={() => handleNavigate(recipe)}>
                <div className='first-card-div'>
                  <img className='display-recipe-img' src={recipe.imageUrl} alt={recipe.title} />
                  <b className='card-category'>{recipe.categories[0]}</b>
                </div>
                <div className='second-card-div'>
                  <h3>{recipe.title}</h3>
                  <span>Betyg</span>
                  {recipe.avgRating === null ? <p>inga betyg</p> : <p>{recipe.avgRating?.toFixed(1)}/5</p>}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
};

export default SearchRecipe;
