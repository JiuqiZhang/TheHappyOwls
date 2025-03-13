import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import * as Icon from "react-native-feather";
import { Image } from "expo-image";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ReviewCard from "../../Component/ReviewCard";

export default function ManageCheckInScreen({ navigation }) {
    const [checkIns, setCheckIns] = React.useState([]);

    const fetch = async () => {
        const res = await axios.get("https://data.tpsi.io/api/v1/reviews/" + user.email);
        setCheckIns(res.data);
    }

    async function reloadPage() {
        console.log('reloading')
        await fetch();
    }

    const user = useSelector((state) => state.user);
    React.useEffect(() => {
        fetch();
    }, []);
    return (
        <>
            <View style={styles.container}>
                <View style={{ width: "100%" }}>
                    <Text
                        style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
                    >
                        Hi, {user.firstName + " " + user.lastName}!
                    </Text>
                </View>
                <View style={styles.countContainer}>
                    <Text
                        style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}
                    >
                        {checkIns.length}
                    </Text>
                    <Text style={{ fontSize: 15, textAlign: "right", marginLeft: 10, marginTop: 10 }}>
                        CHECK-INS
                    </Text>
                </View>
                <ScrollView>
                    <ReviewCard reviews={checkIns} onReload={reloadPage} type={'checkIn'} />
                </ScrollView>
            </View>
            <TouchableOpacity
                style={styles.back}
                onPress={() => {
                    navigation.navigate("Profile");
                }}
            >
                <Icon.ArrowLeft color={"black"} />
            </TouchableOpacity>
            <Image
                style={{
                    height: 210,
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    zIndex: -97,
                }}
                source={require("../../Image/profileBG.png")}
                contentFit="fill"
            />
        </>
    )
}

const styles = StyleSheet.create({
    countContainer: {
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "15%",
        borderBottomColor: "#F5E3A3",
        borderBottomWidth: 5,

    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginVertical: "4%",
    },
    wrapper: {
        marginVertical: "7%",
    },
    container: {
        flex: 1,
        paddingTop: "20%",
        // paddingHorizontal: "5%",
    },
    divider: {
        marginTop: "7%",
        borderTopColor: "#F5E3A3",
        // borderBottomWidth: 5,
        borderTopWidth: 5,
        alignItems: "start",
    },
    back: {
        position: "absolute",
        left: "4%",
        top: "6%",
    },
    email: {
        color: "grey",
        fontSize: 13,
    },
});
