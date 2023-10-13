import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import { useState, useEffect } from "react";
import FlashMessage from "react-native-flash-message";
import * as React from "react";
import Routes from './src/Navigation/Route';
import { Provider } from "react-redux";
import { Store } from "./src/redux/store";

import { enableScreens } from 'react-native-screens';
enableScreens();

export default function App() {


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
    <Provider store={Store}>
    <Routes />
    <FlashMessage
        position="top"
      />
     </Provider>
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerShown: false,
    //     }}
    //   >
    //     <Stack.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{ title: "Happy Owls" }}
    //     />
    //     <Stack.Screen name="Profile" component={ProfileScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
