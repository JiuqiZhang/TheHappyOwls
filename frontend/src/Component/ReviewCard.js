import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from "react-native";
import { Divider } from "react-native-elements";
import * as Icon from "react-native-feather";
const { height, width } = Dimensions.get("screen");
import ImageViewer from './ImageViewer'
import ReviewModal from "./ReviewModal";
import ReviewContentModal from "./ReviewContentModal";
import Rating from "react-native-ratings/dist/SwipeRating";
import { Avatar } from "react-native-elements";

//this is the page to display each review in the manage check in page
export default function ReviewCard({ reviews, onReload, type }) {

    // console.log(reviews);
    const [isOpen, setIsOpen] = useState(false);
    const [option, setOption] = useState("");
    const [selectedReview, setSelectedReview] = useState({});
    const [reviewsFromStore, setReviewsFromStore] = useState(reviews ?? []);
    const [reviewID, setReviewID] = useState(0);
    React.useEffect(() => {
        setReviewsFromStore(reviews);
    }, [reviews]);
    const hideModal = () => {
        setIsOpen(false);
    }
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
            if (i < rating) {
                icons.push(
                    <Icon.Star key={i} width={18} height={18} color="#FFD700" fill="#FFD600" style={{ marginRight: 3 }} />
                );
            } else {
                icons.push(
                    <Icon.Star key={i} width={18} height={18} color="#FFD700" style={{ marginRight: 3 }} />
                );
            }
        }
        return <View style={{ flexDirection: "row", marginRight: 10 }}>{icons}</View>
    }
    const listPhotos = (photo) => {
        if (photo === undefined || photo.length === 0) {
            return
        }
        let photos = [];
        for (let i = 0; i < photo.length; i++) {
            photos.push(
                <ImageViewer key={i} source={photo[i].id} option={"show"} localSource={false}></ImageViewer >
            );
        }
        return <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            {photos}
        </ScrollView>
    }

    const listDishes = (dishes) => {
        return dishes.map((dish, index) => (
            <View key={dish} style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 14 }}>{dish}</Text>
                <Text style={{}}>{index === dishes.length - 1 ? "" : ", "}</Text>
            </View>
        ))
    }

    const editReview = (reviewIndex) => {
        setOption("edit");
        setSelectedReview(reviews[reviewIndex]);
        setIsOpen(true);

    }
    //to open the modal to delete the review
    const deleteReview = (reviewIndex) => {
        setReviewID(0)
        setIsOpen(true);
        setOption("delete");
        console.log("Delete review: ", reviews[reviewIndex]);
        setReviewID(reviews[reviewIndex]._id);
    }
    const onDeleteConfirm = async () => {

        const requestOptions = {
            method: "DELETE",
            // redirect: "follow"
        };

        fetch("https://data.tpsi.io/api/v1/reviews/" + reviewID, requestOptions)
            .then((response) => {
                response.text();
                console.log("Delete response: ", response.status);
                if (response.status === 200) {
                    onReload();
                    setIsOpen(false);
                    Alert.alert("Deleted!", "The review has been deleted.");
                }
            })
            .catch((error) => console.error(error));
    }


    //to display review card in the manage check in page
    if (type == "checkIn") {
        return (
            <>
                <View style={styles.divider}>
                    <Text style={styles.reviewHeader}>Recent Activities</Text>
                </View>
                {reviews.map((review, index) => {
                    return (
                        <View key={review._id} style={styles.container}>
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
                                <Text style={{ flexWrap: "wrap" }}>{review.content}</Text>
                                {/* View for favorite dishes */}
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, flexWrap: "wrap" }}>
                                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>Favorites: </Text>
                                    {listDishes(review.dish)}
                                </View>
                                {/* This is the view for buttons */}
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                    <Icon.Edit width={24} height={24} color="black" style={{ marginRight: 5 }} onPress={() => (editReview(index))} />
                                    <Icon.Trash2 width={24} height={24} color="black" style={{ marginLeft: 5 }} onPress={() => (deleteReview(index))} />
                                </View>
                                <ReviewContentModal onReload={onReload} content={selectedReview} isOpen={isOpen} hideModal={hideModal} option={option} onConfirm={() => (onDeleteConfirm(index))} />
                            </View>
                        </View>)
                })}
            </>
        );
        //below is to display the reviews in store detail page
    } else {
        return (
            <>
                <View style={styles.divider}>
                    <Text style={styles.reviewHeader}>Recent Activities</Text>
                </View>
                {reviewsFromStore.map((review, index) => {
                    console.log("Review: ", review);
                    return (
                        <View key={review._id} style={styles.container}>

                            <View style={styles.headerContainer}>
                                <View style={{ flexDirection: "row" }}>
                                    <Avatar
                                        rounded
                                        source={{
                                            uri: ".",
                                        }}
                                        size={34}
                                        title={review.firstName[0] + review.lastName[0]}
                                    />
                                    <View
                                        style={{ flexDirection: "column", marginLeft: 12 }}
                                    >
                                        <Text style={{ fontSize: 17, fontWeight: 600 }}>
                                            {review.firstName + " " + review.lastName}
                                        </Text>
                                        <Text
                                            style={{
                                                color: "#989898",
                                                fontSize: 10,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {review.date}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    {addHeart(review.rating)}
                                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>{review.rating}</Text>
                                </View>
                            </View>
                            <View style={{ padding: 15 }}>

                                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                    {listPhotos(review.photo)}
                                </View>

                                <Text style={{ flexWrap: "wrap" }}>{review.content}</Text>

                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, flexWrap: "wrap" }}>
                                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>Favorites: </Text>
                                    {listDishes(review.dish)}
                                </View>
                                <ReviewContentModal onReload={onReload} content={selectedReview} isOpen={isOpen} hideModal={hideModal} option={option} onConfirm={() => (onDeleteConfirm(index))} />
                            </View>
                        </View>)
                })}
            </>
        );
    }
    /*
    {reviews.map((review, index) => {
                    
                })}
    */
};

const styles = StyleSheet.create({
    headerContainer: {

        flexDirection: "row",
        flexWrap: "wrap",
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
        // alignItems: "center",
        borderBottomColor: "#989898",
        borderBottomWidth: 1,
        // flexWrap: "wrap",
    },
    reviewHeader: {
        fontSize: 20,
        fontWeight: "600",
        marginLeft: "5%",
        marginTop: "5%",
    },
});
