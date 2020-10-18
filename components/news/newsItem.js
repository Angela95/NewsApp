import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Card from "../UI/Card";

const NewsItem = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.news}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: props.image }}
                fadeDuration={1000}
              />
            </View>
            <View style={styles.details}>
              <Text style={styles.description}>{props.decription}</Text>
            </View>
            <View style={styles.actions}>{props.children}</View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  news: {
    height: 400,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "40%",
    overflow: "hidden",
    marginVertical: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    alignItems: "center",
    height: "18%",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 14,
    marginVertical: 2,
    fontWeight: "bold",
    textAlign: "justify",
  },
  description: {
    fontSize: 12,
    color: "#888",
  },
  actions: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: "20%",
    paddingHorizontal: 20,
  },
});

export default NewsItem;
