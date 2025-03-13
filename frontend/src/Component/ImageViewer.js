import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default function ImageViewer({ source, option, localSource, onRemove }) {
    const S3_url = "https://tpsi-review-photos.s3.amazonaws.com/" + source + ".png";
    const url = localSource ? { url: source } : { url: S3_url };
    return option === "edit" ? (
        <View>
            <Image source={url.url} style={styles.imageEdit} >
                <TouchableOpacity onPress={onRemove}>
                    <Ionicons name="close" size={24} color="white" style={styles.closeButton} />
                </TouchableOpacity>
            </Image>
        </View>
    ) : (
        <Image source={url.url} style={styles.image} />
    )
}

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    imageEdit: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    closeButton: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "rgba(0,0,0,0.8)", // Dark semi-transparent background
        // borderRadius: 50,
        // padding: 5,
    },
});