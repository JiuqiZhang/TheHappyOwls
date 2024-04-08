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
        tabBarStyle:{
          backgroundColor:'#F9EEC8'
        },
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;


            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
  
        // tabBarShowLabel:false,
    //     tabBarStyle:{
    //       bottom:'3%',
    //       position:'absolute',
    //       height:'7%',
    //       marginHorizontal:"5%",
    //       borderRadius: 60,
    // alignItems: "center",
    // justifyContent: "center",


    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 5,

    //     }
      }}
 
    >
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: ({focused}) => <Entypo name="drink" size={24} color={focused?'black':'grey'} />,
         
          
        }}
        
      />

      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({focused}) => <Feather name="map-pin" size={24}  color={focused?'black':'grey'}  />,
          
        }}
      />
      <Tab.Screen
        name="Saved"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => <Entypo name="bookmark" size={24} color={focused?'black':'grey'} />,
         
          
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => <AntDesign name="user" size={24} color={focused?'black':'grey'} />,
          
        }}
      />
    </Tab.Navigator>
  );
};
