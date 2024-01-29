import React, {useState} from "react";
import {
  Text,
    StyleSheet,
    View,
    TextInput
  } from 'react-native';
import { Divider } from "react-native-elements";
import * as Icon from "react-native-feather";
export const Searchbar = ({value, onchange, setResult}) =>{

    return(
       
      <View style={styles.searchArea}>
      <View style={styles.inputContainer}>
        <Icon.Search color={"grey"} />
        <Divider orientation="vertical" style={styles.divider} />

        <TextInput style={styles.input} value={value} onChangeText={onchange} placeholder="Search store name" onSubmitEditing={()=>{setResult()}}/>
      </View>

    </View>
    )
         
}

const styles = StyleSheet.create({
    container: {
  
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
        minHeight: 50,
        height: 50,
        maxWidth: "90%",
        borderWidth: 1,
        borderColor: "white",
        padding: 10,
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",
        margin: 10,
        backgroundColor:'#FFFEFA',
        shadowColor:'grey',
        shadowOffset: { width: 0, height:2  },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      },
      searchArea: {
        width: "100%",
        padding: "1%",
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: "grey",
        paddingTop:0,
        borderTopColor: "grey",
        borderWidth: 0.4,
        borderTopWidth:0
      },
      divider: {
        marginHorizontal: 6,
        borderColor: "grey",
      },
      input: {
        minWidth: "80%",
      },
  });