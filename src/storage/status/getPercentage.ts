import { MealInfo } from "@screens/NewMeal";

export const getPercentage = async (meals: MealInfo[]): Promise<number> => {
  let totalMeals = meals.length;
  let mealsInsideDiet = meals.filter((meal) => meal.insideDiet).length;

  if (totalMeals === 0) return 0;

  const percentage = (mealsInsideDiet / totalMeals) * 100;

  return percentage;
};
