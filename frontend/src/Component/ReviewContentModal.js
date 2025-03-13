import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, View, Text, Button, TouchableOpacity, Dimensions, ScrollView, SafeAreaView } from 'react-native'
const { height, width } = Dimensions.get("screen");
import * as ImagePicker from "expo-image-picker";
import { Image } from 'expo-image';

import RatingSlider from './RatingSlider';
import PersonNotes from './PersonalNotes';
import EditDish from './EditDish';
import ImageViewer from './ImageViewer';

export default function ReviewContentModal({ isOpen, hideModal, option, onConfirm, content, onReload }) {
    const [photos, setPhotos] = useState(content.photo ?? []);
    const [dish, setDish] = useState(content.dish ?? []);
    const [selectedImages, setSelectedImages] = useState([]);
    const [notes, setNotes] = useState(content.content ?? "");
    const [rating, setRating] = useState(content.rating ?? 0);
    useEffect(() => {
        setPhotos(content.photo ?? []);
        setDish(content.dish ?? []);
        setNotes(content.content ?? "");
        setRating(content.rating ?? 0);
    }, [content.photo], [content.dish], [content.content], [content.rating]);

    const collectInformation = async () => {
        const review = {
            rating: rating,
            content: notes,
            photo: photos,
            dish: dish,
            newPhotos: selectedImages,
            _id: content._id
        };
        const formData = new FormData();
        const reviewToSend = {
            content: notes,
            _id: content._id,
            username: content.username,
            rating: rating,
            dish: dish,
            photo: photos,
            store_id: content.store_id,
            date: content.date,
            firstName: content.firstName,
            lastName: content.lastName,
        }
        formData.append("review", JSON.stringify(reviewToSend));
        // if user has selected images, add them to the formdata
        if (selectedImages.length > 0) {
            selectedImages.map((image, index) => {
                console.log('selected images: ')
                console.log(image)
                formData.append("file", {
                    uri: image.id,
                    name: "fileName" + index,
                    type: "image/png",
                });
            });
        }
        var requestOptions = {
            method: "POST",
            body: formData,
        };
        console.log('formData: ');
        console.log(formData._parts)
        try {
            const response = await fetch("http://localhost:8080/api/v1/reviews/update", requestOptions);
            const data = await response.json();
            if (data) {
                console.log("Review updated successfully");
                onReload();
                hideModal();
                setSelectedImages([]);
            } else {
                Alert.alert("Unsuccess!", "Unable to edit review...");
            }
        } catch (e) {
            console.log("Error:", e);
        }
    }

    identifyImage = () => {
        let images_new = [];
        photos.forEach((photo) => {
            if (!photo.type) {
                images_new.push({ id: photo.id })
            }
        })
        // console.log(images_new);
        return images_new;
    }

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                selectionLimit: 9,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.didCancel && result.assets && result.assets.length > 0) {
                let newPhotos = result.assets.map((photo) => (
                    //first step is to add the photo to the state
                    { id: photo.uri }
                ));
                const old_photos = photos;
                const merged_photos = newPhotos.concat(old_photos);
                setPhotos(merged_photos);
                const additional_images = identifyImage();
                setSelectedImages(additional_images);
            }
        } catch (e) {
            console.log(e);
        }
    };


    const removePhoto = (index) => {
        setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    };
    //when user clicks "DONE"  button when they complete editing the dish
    function receiveDish(dish) {
        console.log('Received dish:', dish);
        setDish(dish);
    }

    function receiveUpdatedNotes(notes) {
        console.log('Received updated notes:', notes);
        setNotes(notes);
    }

    function listPhotos(p) {
        // if (!p || p.length === 0) return;

        let photosArray = [];
        const placeHolder = require("../../assets/plus.png");
        // "Add Photo" button
        photosArray.push(
            <TouchableOpacity key={-1} onPress={pickImage}>
                <ImageViewer source={placeHolder} style={styles.image} localSource={true} />
            </TouchableOpacity>
        );

        // Map through the photos and add them to the list
        p.forEach((photo, i) => {
            if (photo.type) {
                photosArray.push(
                    <ImageViewer
                        key={i}
                        source={photo.id}
                        option={"edit"}
                        localSource={false}
                        onRemove={() => removePhoto(i)} // Pass remove function
                    />
                );
            } else {
                photosArray.push(
                    <ImageViewer
                        key={i}
                        source={photo.id}
                        option={"edit"}
                        localSource={true}
                        onRemove={() => removePhoto(i)} // Pass remove function
                    />
                );
            }

        });

        return <ScrollView horizontal={true}>{photosArray}</ScrollView>;
    }
    return option === "delete" ? (
        // Show this part when user hits delete button
        <Modal visible={isOpen}
            transparent={true}
            animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.deleteContainer}>
                    <Text style={styles.modalText}>Are you sure you want to delete this review?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            hideModal();
                            onConfirm();
                        }}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </TouchableOpacity>

                        {/* No Button */}
                        <TouchableOpacity style={styles.noButton} onPress={hideModal}>
                            <Text style={styles.buttonText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    ) : (<Modal visible={isOpen}
        transparent={true}
        animationType="slide">
        <View style={styles.overlay}>
            <View style={styles.modalContainer}>
                <View>
                    <RatingSlider rating={rating} onChangeRating={(rating) => {
                        setRating(rating);
                    }} />
                </View>
                <View style={styles.dishContainer}>
                    <EditDish dishes={dish}
                        onUpdateDish={(dish) => { receiveDish(dish) }} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <PersonNotes content={notes}
                        onChangeText={(text) => {
                            receiveUpdatedNotes(text)
                        }} />
                </View>
                <View style={styles.photoContainer}>
                    {listPhotos(photos)}
                    {/* <Image source={{ uri: source }} style={{ width: 100, height: 100 }} /> */}

                </View>
                <View style={styles.buttonContainer}>
                    <Button title="CLOSE" onPress={hideModal} style={styles.button} />
                    <Button title="SAVE" onPress={collectInformation} style={styles.button} />
                </View>
            </View>
        </View>
    </Modal>);

}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
    },
    deleteContainer: {
        width: width - 40,
        padding: 20,
        backgroundColor: "#FFF9E6",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // Adds shadow on Android
    },
    modalContainer: {
        width: width - 40,
        height: "auto",
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#FFF9E6",
        borderRadius: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // Adds shadow on Android
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: "center",
    },
    buttonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    photoContainer: {
        height: 100,
        margin: 5,
        flexDirection: "row",
        justifyContent: "start",
        // backgroundColor: "red",
    },
    dishContainer: {
        marginHorizontal: 8,
        paddingBottom: 10,
        // backgroundColor: "red",
    }
});