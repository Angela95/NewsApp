import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  Platform,
  View,
  ActivityIndicator,
  Button,
  FlatList,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import LanguageButton from "../components/UI/LanguageButton";
import { useSelector, useDispatch } from "react-redux";
import * as newAction from "../store/actions/news";
import Colors from "../constants/Colors";
import NewsItem from "../components/news/newsItem";

const TopNewsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //get news list from redux store
  const news = useSelector((state) => state.topNews.topNews);
  const dispatch = useDispatch();

  //get selected language from header buttons group
  const [selectedCountry, setSelectedCountry] = useState("GB");

  const languageHandler = (selectedLanguage) => {
    setSelectedCountry(selectedLanguage);
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <LanguageButton
          setLanguage={languageHandler}
          isDisabled={false}
          country={selectedCountry}
        />
      ),
    });
  }, [props.navigation]);

  //get top news using redux
  const loadNews = useCallback(async () => {
    setError(null);
    try {
      await dispatch(newAction.getNews(selectedCountry));
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError, selectedCountry]);

  useEffect(() => {
    setIsLoading(true);
    loadNews().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadNews]);

  //return error screen
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try again" onPress={loadNews} color={Colors.primary} />
      </View>
    );
  }

  //show activity indicator if it's loading
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  //show info if there is no news
  if (!isLoading && news.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No news found.</Text>
      </View>
    );
  }

  //navigate to the Article screen when an item is selected
  const selectItemHandler = (id) => {
    props.navigation.navigate("Article", {
      country: selectedCountry,
      newsId: id,
    });
  };

  return (
    <FlatList
      data={news}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <NewsItem
          title={itemData.item.title}
          image={itemData.item.urlToImage}
          decription={itemData.item.description}
          onSelect={() => {
            selectItemHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="More"
            onPress={() => {
              selectItemHandler(itemData.item.id);
            }}
          />
        </NewsItem>
      )}
    />
  );
};

//set screen options for this screen only
export const screenOptions = (navData) => {
  return {
    headerTitle: "Top News",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TopNewsScreen;
