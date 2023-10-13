import ProfileScreen from "../screens/Profile/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import Menu from "../screens/Store_Menu/Menu";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "../screens/Map/MapScreen";
const Tab = createBottomTabNavigator();
export default TabScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: () => <Entypo name="drink" size={24} />,
        }}
      />

      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: () => <Feather name="map-pin" size={24} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <AntDesign name="user" size={24} />,
        }}
      />
    </Tab.Navigator>
  );
};
