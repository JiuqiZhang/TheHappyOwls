import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import { useState, useEffect } from "react";

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "./screens/MapScreen";
import UploadScreen from "./screens/UploadScreen";
import ProfileScreen from "./screens/ProfileScreen";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();

  // Location.setGoogleApiKey("AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg");

  // const geocode = async () => {
  //   const geocodedLocation = await Location.geocodeAsync(address);
  //   console.log("Geocoded Address:");
  //   console.log(geocodedLocation);
  // };

  // const reverseGeocode = async () => {
  //   const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
  //     longitude: location.coords.longitude,
  //     latitude: location.coords.latitude
  //   });

  //   console.log("Reverse Geocoded:");
  //   console.log(reverseGeocodedAddress);
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Happy Owls" }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//  <View style={styles.container}>
//   <TextInput placeholder='Address' value={address} onChangeText={setAddress} />
//   {/* <Button title="Geocode Address" onPress={geocode} />
//   <Button title="Reverse Geocode Current Location" onPress={reverseGeocode} /> */}
//   <StatusBar style="auto" />
// </View>

// const MapScreen = ({ navigation }) => {
//   return (
//     <Button
//       title="Go to Jane's profile"
//       onPress={() => navigation.navigate("Profile", { name: "Jane" })}
//     />
//   );
// };
const HomeScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Upload" component={UploadScreen} />
      <Tab.Screen name="Stores" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
