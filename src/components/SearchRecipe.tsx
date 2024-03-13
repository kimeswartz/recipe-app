import { useState } from 'react'
import { SearchInterface } from '../interfaces/SearchInterface'
import axios from 'axios'

const  RecipeSearch =()=> {

  //variabler för sökterm, recept och filtrerade recept

  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, SetRecipes] = useState<SearchInterface[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<SearchInterface[]>([]);

  // Funktion för att hämta recept från API-n

  const searchRecipes = async () => {
    try {
      const result = await axios.get<SearchInterface[]>('https://sti-java-grupp4-s4yjx9.reky.se/recipes');
      SetRecipes(result.data);
    } catch (error) {
      console.error('Error fetching recipes', error);
    }
  };

  //Hantera sökning när användaren skickar formuläre
  
  const handleSearch = (e) => {
    e.preventDefault();
    searchRecipes();
    filterRecipes(searchTerm);
  }
  
  // Uppdatera söktermen och filtrera recepten vid varje teckenändring
  const onChange = (e) => {
    setSearchTerm(e.target.value);
    filterRecipes(e.target.value);
  };

  // Filtrera recepten baserat på söktermen
  const filterRecipes = (term: string) => {
    const lowerCaseTerm = term.toLowerCase();
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(lowerCaseTerm)
    );
    setFilteredRecipes(filtered);
  };

  return (
    <div className='search-div'>
        <form className='search-form' onSubmit={handleSearch}>
            <input 
            className='search-bar' 
            type='text'
            placeholder='Search'
            onChange={onChange}
            value={searchTerm}
            />
            <input type='submit' value="Search"/>
        </form>

        {/* Visa sökresultat om det finns matchande recept */}
        {filteredRecipes.length > 0 && (
        <div className='recipe-list'>
          <h2>Search Results</h2>
          <ul>
            {filteredRecipes.map((recipe) => (
              <li key={recipe.id}>
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p> 
                <img src={recipe.imageUrl} alt={recipe.title} />               
              </li>
            ))}
          </ul>
        </div>
      )}
       
    </div>
  )
}

export default RecipeSearch;