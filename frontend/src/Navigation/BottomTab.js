import MapScreen from "../screens/Map/MapScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
export default TabScreen = ({ navigation }) => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };