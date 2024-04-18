export interface RecipeInterface {
  _id?: string;
  title: string;
  description: string;
  ratings?: number[];
  avgRating?: number;
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
