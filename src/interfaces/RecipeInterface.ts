export interface RecipeInterface {
  _id?: string;
  title: string;
  description: string;
  ratings?: number[]; // List of ratings
  avgRating?: number; // Automatic average
  imageUrl: string;
  price: number,
  timeInMins: number;
  categories: string[];
  instructions: string[];
  
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
}
