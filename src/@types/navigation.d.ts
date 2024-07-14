export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      stats: undefined;
      newMeal: undefined;
      newMealInsideOrOutsideDiet: { inDiet: boolean };
      meal: { mealId: string };
      editMeal: { mealId: string };
    }
  }
}
