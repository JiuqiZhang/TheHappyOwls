
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {NavigationContainer} from '@react-navigation/native';
import * as Icon from "react-native-feather";
import Menu from "../screens/Store_Menu/Menu";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapScreen from "../screens/Map/MapScreen";
const Tab = createBottomTabNavigator();
export default TabScreen = ({ navigation }) => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          
        }}
      >
              <Tab.Screen name="Menu" component={Menu} 

// options={{
//       tabBarIcon: () => (
//         <Icon.Coffee />
//       )}}
              />
   
   <Tab.Screen name="Map"  component={MapScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };
