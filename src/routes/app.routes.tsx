import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Components } from "@screens/Components";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Components" component={Components} />
    </Navigator>
  );
}
