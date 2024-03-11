export interface RecipeInterface {
<<<<<<< HEAD
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
=======
    _id: string;
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
>>>>>>> 1726100fbadd742e2af492eec761eeaab1585839
}