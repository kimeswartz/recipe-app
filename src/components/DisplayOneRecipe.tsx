import { RecipeInterface } from "../interfaces/RecipeInterface";

interface DisplayOneRecipeProps {
    recipe: RecipeInterface;
}

const DisplayOneRecipe = ({ recipe }: DisplayOneRecipeProps) => {

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