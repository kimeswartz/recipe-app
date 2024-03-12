import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeInterface } from "../interfaces/RecipeInterface";

const DisplayOneRecipe: React.FC = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState<RecipeInterface | null>(null);

    useEffect(() => {
        const fetchRecipe = async () => { 
            try {
                const response = await fetch(`https://sti-java-grupp4-s4yjx9.reky.se/recipes/${recipeId}`);
                const data: RecipeInterface = await response.json();
                setRecipe(data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [recipeId]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <div>
            <h1>{recipe.title}</h1>
            <img src={recipe.imageUrl} alt={recipe.title} />
            <p>{recipe.description}</p>
            <p>Time to make: {recipe.timeInMins} minutes</p>
            <h2>Ingredients</h2>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                ))}
            </ul>
            <h2>Instructions</h2>
            <ol>
                {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>
            <h2>Categories</h2>
            <ul>
                {recipe.categories.map((category, index) => (
                    <li key={index}>{category}</li>
                ))}
            </ul>
        </div>
    );
};

export default DisplayOneRecipe;

