import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Components } from "@screens/Components";
import { Home } from "@screens/Home";
import { StatusScreen } from "@screens/Stats";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="home">
      <Screen name="home" component={Home} />
      <Screen name="stats" component={StatusScreen} />
      <Screen name="components" component={Components} />
    </Navigator>
  );
}
