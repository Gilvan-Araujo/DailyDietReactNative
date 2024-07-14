import { getMeals } from "./getMeals";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEALS_COLLECTION } from "@storage/storageConfig";

export const deleteMeal = async (id: string) => {
  const storage = await getMeals();

  const newStorage = storage.filter((meal) => meal.id !== id);

  AsyncStorage.setItem(MEALS_COLLECTION, JSON.stringify(newStorage));
};
