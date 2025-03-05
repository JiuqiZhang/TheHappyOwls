import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ReviewCardDish({ dishes }) {
    dishes.map((dish, index) => {
        // console.log(dish);
        return (
            <View key={index}>
                <Text >{dish}</Text>
            </View>
        );
    });
}