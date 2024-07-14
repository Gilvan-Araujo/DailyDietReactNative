import { MealInfo } from "@screens/NewMeal";
import { getMeals } from "./getMeals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEALS_COLLECTION } from "@storage/storageConfig";

export const updateMeal = async (meal: MealInfo) => {
  const storage = await getMeals();

  const newStorage = storage.map((item) => {
    if (item.id === meal.id) {
      return meal;
    }

    return item;
  });

  await AsyncStorage.setItem(MEALS_COLLECTION, JSON.stringify(newStorage));
};
