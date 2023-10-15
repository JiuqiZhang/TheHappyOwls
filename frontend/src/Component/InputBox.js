import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';


export default function InputBox(props) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{props.label}</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          defaultValue={props.value}
          onChangeText={props.onchange} 
          editable={false}       />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
      backgroundColor:'white',
      paddingTop: 5,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'lightgrey',
      borderRadius: 9,
      
    },
    icon: {
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      fontSize: 13,
      height: 35,
      color: "black",
    },
    label: {
    
      color:'grey',
      fontSize: 13,
    },
  });