import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEALS_COLLECTION } from "../storageConfig";
import { MealInfo } from "@screens/NewMeal";

export const getMeals = async () => {
  const storage = await AsyncStorage.getItem(MEALS_COLLECTION);

  if (!storage) return [];

  return JSON.parse(storage) as MealInfo[];
};
