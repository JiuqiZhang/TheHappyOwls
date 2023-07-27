import { Text, StyleSheet, View } from "react-native";
import { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

export default MapScreen = ({}) => {
  const [userLocation, setLocation] = useState();
  const [address, setAddress] = useState();
  const mapRef = useRef(null);
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);
      
       mapRef.current.animateToRegion({
        latitude: currentLocation['coords']['latitude'],
        longitude: currentLocation['coords']['longitude'],
        latitudeDelta: 0.00922,
        longitudeDelta: 0.0021,
      },  1000);
 
    };
    getPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <MapView 
       ref={mapRef}
       initialRegion={{
    latitude: 37.785834,
    longitude: -122.406417,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.0021,
  }} style={styles.map}>{userLocation?<Marker coordinate={userLocation.coords} />:<Text>Waiting</Text>}</MapView>
  <Text>{userLocation?(userLocation['coords']['latitude']+ ', '+userLocation['coords']['longitude']):"Waiting"}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
