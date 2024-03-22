
import { useEffect} from "react";
import allRecipeState from '../state/Endpoints';
import { useNavigate } from "react-router-dom";

import "../styling/RecipiesByCategoryStyle.css"

const TopRatedRecipes = () => {
  
//     const {recipeList, fetchAllRecipes} = allRecipeState();
//     const navigate = useNavigate();

//   useEffect(() => {
//     fetchAllRecipes();
//     }, [recipeList]);

//   const filteredRecipes = recipeList.filter((recipe) => recipe.avgRating >= 3);

// //   Function to handle a click on a specific recipe
// //   const handleRecipeClick = (recipeId: string) => {
// //     navigate(`/Recipe/${recipeId}`); // Navigating to the recipe page with the selected recipe id
// //   };

  return (
    <div className="recipeContainer">
      <h2>Top Rated Recipes</h2>
      {/* <div className="recipeList">
        {filteredRecipes
          .sort((a, b) => b.avgRating - a.avgRating)
          .map((recipe) => (
            <div
            key={recipe._id}
            className="recipeItem"
            // onClick={() => handleRecipeClick(recipe._id)}
          >
                <div className="imgContainer">
                  <img src={recipe.imageUrl} alt={recipe.title} />
                </div>
                <div className="textContainer">
                  <h2>
                    {recipe.title}, {recipe.avgRating}
                  </h2>
                </div>
              </div>
            )
          )}
      </div> */}
    </div>
  );
};

export default TopRatedRecipes;
