import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Slider from "@react-native-community/slider";
const { height, width } = Dimensions.get("screen");

export default function RatingSlider(props) {
    const [value, setValue] = React.useState(props.rating ?? 0);
    React.useEffect(() => {
        setValue(props.rating ?? 0);
    }, [props.rating]);
    console.log(value)
    return (
        <View>
            <View
                style={{
                    marginHorizontal: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "500",
                    }}
                >
                    Rating
                </Text>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: value == 0 ? "grey" : "black",
                    }}
                >
                    {value == NaN ? "Not Rated" : Math.round(value * 10) / 10}
                </Text>
            </View>
            <Slider
                style={{ width: width - 55, height: 6, marginBottom: 22 }}
                minimumValue={0}
                maximumValue={5}
                minimumTrackTintColor="#FFC700"
                maximumTrackTintColor="#D9D9D9"
                value={value}
                onValueChange={(value) => {
                    props.onChangeRating((Math.round(value * 10) / 10));
                    setValue(value);
                }}
            />
        </View>
    )

}