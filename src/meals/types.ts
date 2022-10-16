export type Meal = {
    name: string;
    ingredients: { name: string; amount: number; description: string }[];
    totalGrams: number;
    totalCalories: number;
    category: 'breakfast' | 'lunch' | 'dinner' | 'dessert';
};
