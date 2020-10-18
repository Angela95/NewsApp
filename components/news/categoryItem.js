import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  ImageBackground,
} from "react-native";
import Swiper from "react-native-web-swiper";

const CategoryItem = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleCategoryContainer}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <Text style={styles.titleCategory}>{props.titleCategory}</Text>
        </TouchableCmp>
      </View>
      <View style={styles.swipeContainer}>
        <Swiper
          from={0}
          minDistanceForAction={0.1}
          controlsProps={{
            dotsTouchable: true,
            prevPos: "left",
            nextPos: "right",
            nextTitle: ">",
            nextTitleStyle: {
              color: "black",
              fontSize: 30,
              fontWeight: "bold",
            },
            PrevComponent: ({ onPress }) => (
              <TouchableOpacity onPress={onPress}>
                <Text
                  style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
                >
                  {"<"}
                </Text>
              </TouchableOpacity>
            ),
          }}
        >
          {props.newsSlider.map((item) => {
            return (
              <View style={styles.slideContainer}>
                <ImageBackground
                  source={{ uri: item.urlToImage }}
                  style={styles.bgImage}
                >
                  <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={1}>
                      {item.title.toUpperCase()}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            );
          })}
        </Swiper>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  titleCategoryContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    backgroundColor: "black",
    padding: 15,
  },
  titleCategory: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "grey",
    textShadowOffset: { width: 2, height: 0 },
    textShadowRadius: 1,
    shadowOpacity: 0.3,
    textAlign: "center",
  },
  swipeContainer: {
    height: 270,
    flex: 1,
  },
  slideContainer: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    opacity: 0.8,
    justifyContent: "flex-end",
  },
  titleContainer: {
    height: 40,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 16,
    color: "white",
    textAlign: "justify",
  },
});

export default CategoryItem;
