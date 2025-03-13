import React, { useState, useEffect } from "react";
import { TextInput, Modal, SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

export default function EditDish(props) {
    const [dish, setDish] = React.useState(props.dishes);
    const [isEditDish, setIsEditDish] = React.useState(false);
    // useEffect(() => {
    //     setDish(props.dishes);
    // }, [dish]);
    useEffect(() => {
        // Only update the state if the prop value is different from current state
        if (JSON.stringify(dish) !== JSON.stringify(props.dishes)) {
            setDish(props.dishes);
        }
    }, [props.dishes]);


    function handleChangeText(index, newText) {
        const updatedDish = [...dish];
        updatedDish[index] = newText;
        setDish(updatedDish)
    }

    const confirmUpdate = () => {
        console.log("child component:", dish);
        //TODO: update dishes back to parent component
        props.onUpdateDish(dish);
        setIsEditDish(false);
    }

    const addHandler = () => {
        console.log('Before update:', dish);
        setDish(prevValues => {
            const updatedValues = [...prevValues, ''];
            console.log('After update:', updatedValues);
            return updatedValues;
        });
    };

    const removeDish = (index) => {
        let updatedDish = [...dish];
        updatedDish.splice(index, 1);
        setDish(updatedDish);
        // setDish(prevValues => {
        //     const updatedValues = prevValues.slice(index, 1);
        //     return updatedValues;
        // });
    }

    function listDishes() {
        return props.dishes.map((dish, index) => (
            <View key={dish} style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 14, }}>{dish}</Text>
                <Text style={{}}>{index === props.dishes.length - 1 ? "" : ", "}</Text>
            </View>
        ))
    }
    return (
        <TouchableOpacity
            onPress={() => {
                setIsEditDish(true);
            }}
            style={{
                flexDirection: "row",
                // height: 43.5,
                width: "100%",
                justifyContent: "space-between",
                // marginBottom: 10,
                // marginRight: 20,

            }}
        >
            <View style={styles.mainContainer}>
                <View style={{ justifyContent: "center" }}>
                    <Ionicons
                        name={"beer"}
                        size={30} />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "start", flexWrap: "wrap", padding: 10 }}>
                    {listDishes()}
                </View>
                <Modal animationType="none" transparent={false} visible={isEditDish}>
                    <SafeAreaView>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: 20,
                                marginTop: 10,
                                paddingBottom: 10,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    // setInputs([{ key: "", value: "" }]);
                                    setIsEditDish(false);
                                }}
                            >
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                                Your Favorite Dishes
                            </Text>
                            <TouchableOpacity
                                onPress={confirmUpdate}
                            >
                                <Text>Done</Text>
                            </TouchableOpacity>
                        </View>
                        {dish.map((input, key) => {
                            return (
                                <View key={key} style={styles.inputRow}>
                                    <TextInput
                                        style={styles.input}
                                        outlineColor="grey"
                                        mode="outlined"
                                        maxLength={15}
                                        activeOutlineColor="black"
                                        placeholder="What dishes can't we miss?"
                                        value={input}
                                        onChangeText={(newText) => handleChangeText(key, newText)}
                                    />
                                    {/* Remove button */}
                                    <TouchableOpacity onPress={() => {
                                        removeDish(key);
                                    }}>
                                        <Ionicons name="close-circle" size={20} color="black"
                                            style={styles.removeButton} />
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                        <TouchableOpacity
                            onPress={() => {
                                addHandler();
                            }}
                        >
                            <LinearGradient
                                colors={["#F9EEC8", "#FFD029", "#D9AA04"]}
                                start={{ x: -1.4, y: 0 }}
                                end={{ x: 2.6, y: 0.6 }}
                                style={{
                                    height: 39,
                                    borderRadius: 20,
                                    width: 185,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignSelf: "center",
                                    marginTop: 30,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: "bold",
                                    }}
                                >
                                    + Add Another Dish
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "row",
        // backgroundColor: "#FBBC05",
        height: "auto",
        borderTopColor: "black",
        borderTopWidth: 1,
        // backgroundColor: "#FFF9E6",
    },
    input: {
        flex: 1, // Take available space
        height: 40,
        borderColor: 'gray',
        borderWidth: 2,
        paddingLeft: 10,
        borderRadius: 5,
    },
    inputRow: {
        flexDirection: 'row', // Arrange input and button in a row
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 20,
    },
    removeButton: {
        marginLeft: 10,
    },
});