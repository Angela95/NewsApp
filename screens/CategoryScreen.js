import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Button,
  FlatList,
} from "react-native";
import LanguageButton from "../components/UI/LanguageButton";
import { useSelector, useDispatch } from "react-redux";
import * as newAction from "../store/actions/news";
import Colors from "../constants/Colors";
import NewsItem from "../components/news/newsItem";

const CategoryScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //get selected category from parent screen
  const categoryName = props.route.params.categoryName;

  //get news by selected category from redux store
  const news = useSelector((state) => state.topNews.categoryNews);
  const dispatch = useDispatch();

  //get selected language from header buttons group
  const [selectedCountry, setSelectedCountry] = useState(
    props.route.params.country
  );

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

  //get news by category using redux
  const loadNewsByCategory = useCallback(async () => {
    setError(null);
    try {
      await dispatch(newAction.getCategoryNews(selectedCountry, categoryName));
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError, selectedCountry]);

  useEffect(() => {
    setIsLoading(true);
    loadNewsByCategory().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadNewsByCategory]);

  //return error screen
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadNewsByCategory}
          color={Colors.primary}
        />
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
      fromScreen: "Categories",
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

export const screenOptions = (navData) => {
  //set selected category as header title
  return {
    headerTitle: navData.route.params.categoryName.toUpperCase(),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryScreen;
