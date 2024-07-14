import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Components } from "@screens/Components";
import { EditMeal } from "@screens/EditMeal";
import { Home } from "@screens/Home";
import { Meal } from "@screens/Meal";
import { NewMeal } from "@screens/NewMeal";
import { NewMealInsideOrOutsideDiet } from "@screens/NewMealInOrOutsideDiet";
import { Statistics } from "@screens/Statistics";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="home">
      <Screen name="home" component={Home} />
      <Screen name="stats" component={Statistics} />
      <Screen name="newMeal" component={NewMeal} />
      <Screen
        name="newMealInsideOrOutsideDiet"
        component={NewMealInsideOrOutsideDiet}
      />
      <Screen name="meal" component={Meal} />
      <Screen name="editMeal" component={EditMeal} />
      <Screen name="components" component={Components} />
    </Navigator>
  );
}
