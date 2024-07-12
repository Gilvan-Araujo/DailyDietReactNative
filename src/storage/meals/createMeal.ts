import AsyncStorage from "@react-native-async-storage/async-storage";
import { MealInfo } from "@screens/NewMeal";
import { MEALS_COLLECTION } from "@storage/storageConfig";

export const createMeal = async (mealInfo: MealInfo) => {
  const storage = await AsyncStorage.getItem(MEALS_COLLECTION);

  if (!storage) {
    await AsyncStorage.setItem(MEALS_COLLECTION, JSON.stringify([mealInfo]));

    return;
  }

  const meals = JSON.parse(storage);
  meals.push(mealInfo);

  await AsyncStorage.setItem(MEALS_COLLECTION, JSON.stringify(meals));
};
