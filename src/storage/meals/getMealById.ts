import { getMeals } from "./getMeals";

export const getMealById = async (mealId: string) => {
  const meals = await getMeals();

  if (!meals.find((meal) => meal.id === mealId)) {
    throw new Error("Meal not found for id: ".concat(mealId));
  }

  return meals.find((meal) => meal.id === mealId);
};
