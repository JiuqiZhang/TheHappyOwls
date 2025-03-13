import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import * as Icon from "react-native-feather";
import ImageViewer from './ImageViewer'

//this is the page to display each review in the manage check in page
export default function ReviewCard({ reviews }) {

    const calculateDaysUntilToday = (dateString) => {
        // Convert MM/DD/YYYY string to a Date object
        const [month, day, year] = dateString.split('/').map(Number);
        const inputDate = new Date(year, month - 1, day); // Month is 0-based in JS Date()

        // Get today's date (without time)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Calculate the difference in days
        const diffInTime = today - inputDate;
        const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

        return diffInDays;
    };

    const addHeart = (rating) => {

        let icons = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating - 1) {
                icons.push(
                    <Icon.Heart key={i} width={18} height={18} color="#FFD700" fill="#FFD600" style={{ marginRight: 5 }} />
                );
            } else {
                icons.push(
                    <Icon.Heart key={i} width={18} height={18} color="#FFD700" style={{ marginRight: 5 }} />
                );
            }

        }
        return <View style={{ flexDirection: "row", marginRight: 10 }}>{icons}</View>
    }
    const listPhotos = (photo) => {
        let photos = [];
        for (let i = 0; i < photo.length; i++) {
            photos.push(
                <ImageViewer key={i} source={photo[i].id}></ImageViewer >
            );
        }
        // return <View style={{ flexDirection: "row", marginRight: 10 }}>{photos}</View>
        return <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            {photos}
        </ScrollView>
    }

    const listDishes = (dishes) => {
        return dishes.map((dish, index) => (
            <View key={index} style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 14, }}>{dish}</Text>
                <Text style={{}}>{index === dishes.length - 1 ? "" : ", "}</Text>
            </View>
        ))
    }

    return (
        <>
            <View style={styles.divider}>
                <Text style={styles.reviewHeader}>Recent Activities</Text>
            </View>
            {reviews.map((review, index) => {
                return (
                    <View key={index} style={styles.container}>
                        {/* View to contain store name, time and rating */}
                        <View style={styles.headerContainer}>
                            <View>
                                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{review.store[0].name}</Text>
                                <Text style={{ fontSize: 12, color: "#989898", marginTop: "1%" }}>{calculateDaysUntilToday(review.date) < 1 ? "Just now" : calculateDaysUntilToday(review.date) + " days ago"}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                {addHeart(review.rating)}
                                <Text style={{ fontSize: 17, fontWeight: "bold" }}>{review.rating}</Text>
                            </View>
                        </View>
                        <View style={{ padding: 15 }}>
                            {/* View for photos */}
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                {listPhotos(review.photo)}
                            </View>
                            {/* View for review content */}
                            <Text>{review.content}</Text>
                            {/* View for favorite dishes */}
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: "bold" }}>Favorites: </Text>
                                {listDishes(review.dish)}
                            </View>
                            {/* This is the view for buttons */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                <Icon.Edit width={24} height={24} color="black" style={{ marginRight: 5 }} />
                                <Icon.Trash2 width={24} height={24} color="black" style={{ marginLeft: 5 }} />
                            </View>
                        </View>
                    </View>)
            })}
        </>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    favoriteContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "left",
        alignItems: "left",
    },
    container: {
        marginHorizontal: "5%",
        marginTop: "5%",
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#989898",
        borderBottomWidth: 1,
    },
    reviewHeader: {
        fontSize: 20,
        fontWeight: "600",
        marginLeft: "5%",
        marginTop: "5%",
    },
    // divider: {
    //     marginTop: "7%",
    //     borderTopColor: "#F5E3A3",
    //     // borderBottomWidth: 5,
    //     borderTopWidth: 5,
    //     alignItems: "start",
    // },
});
