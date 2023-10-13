import React from "react"
import { View, Text,StyleSheet, TouchableOpacity,TextInput } from "react-native"
import * as Icon from 'react-native-feather'
export default FeedbackScreen = ({ navigation }) => {
    const [text, changeText] = React.useState('')
    return(<View style={styles.container}><TouchableOpacity
        style={styles.back}
        onPress={() => {
            navigation.navigate("Profile");
        }}
    ><Icon.X color={"black"} /></TouchableOpacity>
    <Text style={styles.title}>Share your feedback</Text>
    <Text>Your opinion means the world to us, and we're always striving to make things even better for you.
{'\n'}</Text>
<Text>We'd love to hear your thoughts! Whether it's a feature you adore or something you think could be improved, your feedback helps us create an app that you'll truly love.
{'\n\n'}</Text>
<Text>What’s your feedback about?</Text>

<View style={styles.textAreaContainer} >
    <TextInput
      style={styles.textArea}
      underlineColorAndroid="transparent"
      numberOfLines={10}
      multiline={true}
      value={text}
      onChangeText={changeText}
    />
  </View>
  <TouchableOpacity onPress={()=>{console.log(text)}} style={styles.btn}><Text>Submit</Text></TouchableOpacity>

 </View>)
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        paddingTop:'17%',
        paddingHorizontal:'5%'
    },
    back: {
        position: "absolute",
        left: "4%",
        top: "6%",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginVertical: "9%",
      },
      textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5,
        marginVertical:'5%'
      },
      textArea: {
        height: 150,
        justifyContent: "flex-start"
      },
      btn: {
        minWidth: "30%",
        borderRadius: 10,
        height: '7%',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FFCB81",
        alignSelf:'flex-end',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
      },
})