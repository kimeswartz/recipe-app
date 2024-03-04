export interface RecipeInterface {
    title: string;
    description: string;
    ratings: number[]; // Assuming ratings is an array of numbers
    imageUrl: string;
    timeInMins: number;
    categories: string[];
    instructions: string[];
 
    ingredients: {
      name: string;
      amount: number;
      unit: string;
    }[];
}