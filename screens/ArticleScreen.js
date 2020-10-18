import React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import LanguageButton from "../components/UI/LanguageButton";
import Colors from "../constants/Colors";

const ArticleScreen = (props) => {
  //get params from parent screen
  const newsId = props.route.params.newsId;
  const fromScreen = props.route.params.fromScreen;

  //get data from redux store depending on parent screen
  let newsDetails;
  if (fromScreen === "Search") {
    newsDetails = useSelector((state) =>
      state.topNews.searchNews.find((news) => news.id === newsId)
    );
  } else if (fromScreen === "Categories") {
    newsDetails = useSelector((state) =>
      state.topNews.categoryNews.find((news) => news.id === newsId)
    );
  } else {
    newsDetails = useSelector((state) =>
      state.topNews.topNews.find((news) => news.id === newsId)
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{newsDetails.title}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: newsDetails.urlToImage }} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{newsDetails.content}</Text>
      </View>
    </ScrollView>
  );
};

//set screen options for this screen only
export const screenOptions = (navData) => {
  //get selected country parameter from parent screen
  const selectedCountry = navData.route.params.country;
  return {
    headerTitle: "Article",
    headerRight: () => (
      <LanguageButton isDisabled={true} country={selectedCountry} />
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderColor: Platform.OS === "android" ? Colors.primary : "",
    borderWidth: 2,
    borderRadius: 8,
    overflow: 'hidden'
  },
  titleContainer: {
    margin: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "justify",
  },
  imageContainer: {
    height: "50%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height:"100%",
  },
  contentContainer: {
    paddingVertical: 10,
  },
  content: {
    fontSize: 14,
  },
});

export default ArticleScreen;
