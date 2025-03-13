import React from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import * as Icon from 'react-native-feather';
import { Ionicons } from '@expo/vector-icons';


export default function PersonNotes(props) {
    const [notes, setNotes] = React.useState("");
    const [isEditing, setIsEditing] = React.useState(false);
    return (
        <View style={styles.mainContainer}>
            <View style={{ justifyContent: "start", flexDirection: "row" }}>
                <Ionicons
                    name={"clipboard"}
                    size={30} />
                <Text style={{ marginTop: 6 }}>Personal Notes: </Text>
            </View>
            <View style={styles.textContainer}>
                <TextInput
                    scrollEnabled={true}
                    textAlignVertical="top"
                    multiline style={{ padding: 10 }}
                    onChangeText={(text) => {
                        props.onChangeText(text);
                    }}>{props.content}</TextInput>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "Column",
        width: "100%",
        // backgroundColor: "#FBBC05",
        borderTopColor: "#989898",
        borderTopWidth: 1,
        borderBottomColor: "#989898",
        borderBottomWidth: 1,
        borderRadius: 10,
        paddingTop: 10,
    },
    textContainer: {
        width: 300,
        height: 150,
        marginTop: 10,


    }
});