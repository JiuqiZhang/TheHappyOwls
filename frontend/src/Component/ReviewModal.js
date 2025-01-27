import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { Divider } from "react-native-elements";
import * as Icon from "react-native-feather";
const { height, width } = Dimensions.get("screen");
export default function ReviewModal(props) {
  const [value, setValue] = useState(0);
  const [notes, setNotes] = useState();
  const [dishes, setDishes] = useState(0);
  const [editnote, isEditnote] = useState(false);
  const [editdish, isEditdish] = useState(false);
  const [image, setImage] = useState(null);
  const [inputs, setInputs] = useState([{ key: "", value: "" }]);
  const user = useSelector((state) => state.user);
  const [signify, setSignify] = useState(false);
  const addHandler = () => {
    const addinputs = [...inputs];
    addinputs.push({ key: "", value: "" });
    setInputs(addinputs);
  };

  const inputHandler = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key = key;
    setInputs(_inputs);
  };
  const sendReview = async () => {
    const fetchImageFromUri = async (uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    };

    var formdata = new FormData();
    let dishes = [];
    if (inputs[0].value == "" && inputs.length == 1) {
      dishes = null;
    } else {
      for (let i = 0; i < inputs.length; i++) {
        dishes.push(inputs[i].value);
      }
    }

    formdata.append(
      "review",
      JSON.stringify({
        content: notes,
        store_id: props.store,
        username: user.email?user.email:null,
        rating: value == 0 ? 0 : Math.round(value * 10) / 10,
        dish: dishes,
      })
    );
    let files = [];
    if (image) {
      Promise.allSettled(
        image.map(async (file, i) => {
          console.log(file);
          formdata.append("file", {
            uri: file,
            name: "fileName" + i,
            type: "image/png",
          });
        })
      ).then(async () => {
        var requestOptions = {
          method: "POST",
          body: formdata,
        };

        await fetch("https://data.tpsi.io/api/v1/reviews/", requestOptions)
          .then((data) => {
            if (data.status == "200") {
              props.openReview(false);

              setValue(0);
              setNotes("");
              setDishes("");
              setImage(null);
              setInputs([{ key: "", value: "" }]);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      });
    } else {
      var requestOptions = {
        method: "POST",
        body: formdata,
      };
      console.log(formdata);
      await fetch("https://data.tpsi.io/api/v1/reviews/", requestOptions)
        .then((data) => {
          if (data.status == "200") {
            props.openReview(false);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,

        allowsMultipleSelection: true,
        selectionLimit: 9,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        let photos = [];
        result.assets.map((photo) => {
          photos.push(photo.uri);
        });
        setImage(photos);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.review}
      onRequestClose={() => {
        props.openReview(false);
      }}
    >
      <Modal animationType="none" transparent={false} visible={editnote}>
        <SafeAreaView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setNotes(null);
                isEditnote(false);
              }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Your Personal Notes
            </Text>
            <TouchableOpacity
              onPress={() => {
                isEditnote(false);
              }}
            >
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            editable
            multiline
            numberOfLines={10}
            style={{ height: height - 80, marginTop: 25 }}
            onChangeText={setNotes}
            value={notes}
            placeholder="     Share your thoughts"
          />
        </SafeAreaView>
      </Modal>
      <Modal animationType="none" transparent={false} visible={editdish}>
        <SafeAreaView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setInputs([{ key: "", value: "" }]);
                isEditdish(false);
              }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Your Favorite Dishes
            </Text>
            <TouchableOpacity
              onPress={() => {
                isEditdish(false);
              }}
            >
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
          {inputs.map((input, key) => (
            <View key={key}>
              <TextInput
                style={{
                  marginHorizontal: 20,
                  marginTop: 10,
                  height: 40,
                  backgroundColor: "white",
                  borderColor: "black",
                  borderBottomWidth: 1,
                }}
                outlineColor="grey"
                mode="outlined"
                maxLength={15}
                activeOutlineColor="black"
                placeholder="What dieshes can't we miss?"
                value={input.value}
                onChangeText={(text) => inputHandler(text, key)}
              />
            </View>
          ))}
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
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
        onPress={() => {
          props.openReview(false);
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            position: "absolute",
            bottom: 0,
            width: width,
            borderRadius: 20,
            paddingHorizontal: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
          activeOpacity={1}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 20,
              top: 19,
              zIndex: 17,
            }}
            onPress={() => {
              props.openReview(false);
            }}
          >
            <Icon.X color={"black"} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 5,
              marginTop: 40,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Rating
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                marginRight: 22,
                color: value == 0 ? "grey" : "black",
              }}
            >
              {value == 0 ? "Not Rated" : Math.round(value * 10) / 10}
            </Text>
          </View>

          <Slider
            style={{ width: width - 40, height: 6, marginBottom: 22 }}
            minimumValue={0}
            maximumValue={5}
            minimumTrackTintColor="#FFC700"
            maximumTrackTintColor="#D9D9D9"
            value={value}
            onValueChange={setValue}
          />
          <View style={{ marginBottom: 126 }}>
            <Divider
              orientation="horizontal"
              width={1}
              style={[
                {
                  borderColor: "black",
                  marginHorizontal: "-10%",
                },
              ]}
              color={"#EAEAEA"}
            />
            <Divider
              orientation="horizontal"
              width={1}
              style={[
                {
                  borderColor: "black",
                  marginHorizontal: "-10%",
                },
              ]}
              color={"#EAEAEA"}
            />
            <TouchableOpacity
              onPress={pickImage}
              style={{
                flexDirection: "row",

                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", height: 43.5 }}>
                <Icon.Camera
                  style={{ alignSelf: "center" }}
                  height={20}
                  color={"#808080"}
                />
                <Text
                  style={{ alignSelf: "center", marginLeft: 30, fontSize: 15 }}
                >
                  Add Photos
                </Text>
              </View>

              <Icon.ArrowRight
                style={{ alignSelf: "center" }}
                color={"#808080"}
              />
            </TouchableOpacity>
            <ScrollView
              horizontal={true}
              style={{ flexDirection: "row", marginBottom: 5 }}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              {image
                ? image.map((item, i) => {
                    return (
                      <Pressable key={i}>
                        <Image
                          source={{ uri: item }}
                          style={{
                            width: 80,
                            height: 80,
                            marginHorizontal: 2,
                          }}
                        />
                      </Pressable>
                    );
                  })
                : null}
            </ScrollView>
            <Divider
              orientation="horizontal"
              width={1}
              style={[
                {
                  borderColor: "black",
                  marginHorizontal: "-10%",
                },
              ]}
              color={"#EAEAEA"}
            />
            <TouchableOpacity
              onPress={() => {
                isEditnote(true);
              }}
              style={{
                flexDirection: "row",
                height: 43.5,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon.Edit
                  style={{ alignSelf: "center" }}
                  height={20}
                  color={"#808080"}
                />
                <Text
                  style={{ alignSelf: "center", marginLeft: 30, fontSize: 15 }}
                >
                  {notes ? (
                    <>
                      <Text style={{ fontWeight: "600" }}>
                        Personal Notes:{" "}
                      </Text>
                      <Text style={{ fontSize: 14 }}>{notes}</Text>
                    </>
                  ) : (
                    "Add Personal Notes"
                  )}
                </Text>
              </View>

              <Icon.ArrowRight
                style={{ alignSelf: "center" }}
                color={"#808080"}
              />
            </TouchableOpacity>
            <Divider
              orientation="horizontal"
              width={1}
              style={[
                {
                  borderColor: "black",
                  marginHorizontal: "-10%",
                },
              ]}
              color={"#EAEAEA"}
            />
            <TouchableOpacity
              onPress={() => {
                isEditdish(true);
              }}
              style={{
                flexDirection: "row",
                height: 43.5,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon.Coffee
                  style={{ alignSelf: "center" }}
                  height={20}
                  color={"#808080"}
                />
                <Text
                  style={{ alignSelf: "center", marginLeft: 30, fontSize: 15 }}
                >
                  {inputs[0].value == "" && inputs.length == 1 ? (
                    "Add Favorite Dishes"
                  ) : (
                    <>
                      <Text style={{ fontWeight: "600" }}>
                        Favorite Dishes:{" "}
                      </Text>
                      {inputs.map((input, i) => {
                        return (
                          <Text style={{ fontSize: 14 }} key={i}>
                            {JSON.stringify(input.value) + " "}
                          </Text>
                        );
                      })}
                    </>
                  )}
                </Text>
              </View>

              <Icon.ArrowRight
                style={{ alignSelf: "center" }}
                color={"#808080"}
              />
            </TouchableOpacity>
            <Divider
              orientation="horizontal"
              width={1}
              style={[
                {
                  borderColor: "black",
                  marginHorizontal: "-10%",
                },
              ]}
              color={"#EAEAEA"}
            />
          </View>
          {signify ? (
            <Text
              style={{
                color: "red",
                fontWeight: "500",
                textAlign: "center",
                paddingBottom: 20,
              }}
            >
              {"Please sign in to post comments."}
            </Text>
          ) : null}

          <TouchableOpacity
            style={{ height: 52, marginBottom: 18 }}
            onPress={user.email ? sendReview : setSignify(true)}
          >
            <LinearGradient
              colors={["#F9EEC8", "#FFD029", "#D9AA04"]}
              start={{ x: -1.4, y: 0 }}
              end={{ x: 2.6, y: 0.6 }}
              style={{
                height: 52,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>Check-In</Text>
            </LinearGradient>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
