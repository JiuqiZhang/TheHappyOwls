import ProfileScreen from "../screens/Profile/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import Menu from "../screens/Store_Menu/Menu";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "../screens/Map/MapScreen";
import { LinearGradient } from "expo-linear-gradient";
import { View,StyleSheet} from "react-native";
const Tab = createBottomTabNavigator();
export default TabScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
    //     tabBarStyle:{
    //       bottom:'3%',
    //       position:'absolute',
    //       height:'7%',
    //       marginHorizontal:"5%",
    //       paddingVertical:'1%',
    //       borderRadius: 60,
    // alignItems: "center",
    // justifyContent: "center",


    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 5,

    //     },
        tabBarLabelStyle:{ position:'absolute',bottom:'-35%'},
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;


            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
  

       
      }}
 
    >
     <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({focused}) => <View><LinearGradient colors={focused?['#F9EEC8', '#FFD029', '#D9AA04' ]:['transparent']}
          start={{ x: -0.4, y: 0 }}  end={{ x: 1.6, y: 1 }}
           style={[styles.shadow,{backgroundColor:focused?'#FED546':'white'}]}/><Feather name="map" size={24}  color={focused?'black':'grey'}  /></View>,
          
        }}
      />
      <Tab.Screen
        name="Search"
        component={Menu}
        options={{
          tabBarIcon: ({focused}) => <View><LinearGradient colors={focused?['#F9EEC8', '#FFD029', '#D9AA04' ]:['transparent']}
          start={{ x: -0.4, y: 0 }}  end={{ x: 1.6, y: 1 }}
           style={[styles.shadow,{backgroundColor:focused?'#FED546':'white'}]}/><Feather name="search" size={24} color={focused?'black':'grey'} /></View>,
         
          
        }}
        
      />

     
      <Tab.Screen
        name="Saved"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => <View><LinearGradient colors={focused?['#F9EEC8', '#FFD029', '#D9AA04' ]:['transparent']}
          start={{ x: -0.4, y: 0 }}  end={{ x: 1.6, y: 1 }}
           style={[styles.shadow,{backgroundColor:focused?'#FED546':'white'}]}/><Entypo name="bookmark" size={24} color={focused?'black':'grey'} /></View>,
         
          
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => <View><LinearGradient colors={focused?['#F9EEC8', '#FFD029', '#D9AA04' ]:['transparent']}
          start={{ x: -0.4, y: 0 }}  end={{ x: 1.6, y: 1 }}
           style={[styles.shadow,{backgroundColor:focused?'#FED546':'white'}]}/><Feather name="user" size={24} color={focused?'black':'grey'} /></View>,
          
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow:{
    position:'absolute',height:55, width:55,zIndex:-1,borderRadius:999,alignSelf:'center',marginTop:-10,
    overflow: 'hidden',
    shadowColor: '#727272',
    shadowRadius: 3,
    shadowOpacity: 1,
    shadowOffset: {width: 10, height: 4},
    elevation:10,
  }
})