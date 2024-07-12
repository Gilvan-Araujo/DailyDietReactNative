import { getMeals } from "@storage/meals/getMeals";
import { getPercentage } from "./getPercentage";

export type StatisticsScreenData = {
  percentage: number;
  bestMealsInsideDietStreak: number;
  totalMeals: number;
  mealsInsideDiet: number;
  mealsOutsideDiet: number;
};

export const getStatisticsScreenData =
  async (): Promise<StatisticsScreenData> => {
    const storage = await getMeals();

    const percentage = await getPercentage(storage);

    const mealsInsideDiet = storage.filter((meal) => meal.insideDiet).length;
    const mealsOutsideDiet = storage.filter((meal) => !meal.insideDiet).length;

    let bestMealsInsideDietStreak = 0;
    let currentStreak = 0;

    if (mealsInsideDiet === storage.length) {
      bestMealsInsideDietStreak = mealsInsideDiet;
    }

    for (let i = 0; i < storage.length; i++) {
      if (storage[i].insideDiet) {
        currentStreak++;
      } else {
        if (currentStreak > bestMealsInsideDietStreak) {
          console.log("xxx", currentStreak, bestMealsInsideDietStreak);
          bestMealsInsideDietStreak = currentStreak;
        }

        currentStreak = 0;
      }
      console.log(bestMealsInsideDietStreak, currentStreak, storage[i]);
    }

    return {
      percentage,
      bestMealsInsideDietStreak,
      totalMeals: storage.length,
      mealsInsideDiet,
      mealsOutsideDiet,
    };
  };
