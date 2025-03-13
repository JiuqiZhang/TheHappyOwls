import { Image } from 'expo-image';
import { StyleSheet, View, Text } from 'react-native';
export default function ImageViewer({ source }) {


    // source={{
    //     uri:
    //       "https://tpsi-review-photos.s3.amazonaws.com/" +
    //       item.id +
    //       ".png",
    //   }}
    const url = "https://tpsi-review-photos.s3.amazonaws.com/" + source + ".png";
    return (
        <Image source={url} style={styles.image} />
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 20,
        marginHorizontal: 5,
    }
});