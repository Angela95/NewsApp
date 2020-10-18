import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  Button,
  ActivityIndicator,
  FlatList,
  TextInput,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import LanguageButton from "../components/UI/LanguageButton";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../constants/Colors";
import * as newAction from "../store/actions/news";
import NewsItem from "../components/news/newsItem";
import { useIsFocused } from "@react-navigation/native";

const SearchScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //get news list from redux store
  const news = useSelector((state) => state.topNews.searchNews);
  const dispatch = useDispatch();

  //set search text input value
  const [searchText, setSearchText] = useState("");

  const searchTextHandler = (searchText) => {
    setSearchText(searchText);
  };

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

  //get news list by search term
  const searchNews = useCallback(async () => {
    setError(null);
    try {
      await dispatch(newAction.searchNews(selectedCountry, searchText));
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError, selectedCountry, searchText]);

  useEffect(() => {
    setIsLoading(true);
    searchNews().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, searchNews]);

  //clear search input value
  const isfocused = useIsFocused();
  useEffect(() => {
    if (isfocused) {
      setSearchText("");
    }
  }, [isfocused]);

  let content;
  //return error screen
  if (error) {
    content = (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try again" onPress={searchNews} color={Colors.primary} />
      </View>
    );
  }

  //show activity indicator if it's loading
  if (isLoading) {
    content = (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  //show info if there is no news or else show search list of news with searched term
  if (!isLoading && news.length === 0) {
    content = (
      <View style={styles.centered}>
        <Text>No news found.</Text>
      </View>
    );
  } else {
    content = (
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
  }

  //navigate to the Article screen when an item is selected
  const selectItemHandler = (id) => {
    props.navigation.navigate("Article", {
      country: selectedCountry,
      newsId: id,
      fromScreen: "Search",
    });
  };

  return (
    <View style={styles.screen}>
      <TextInput
        placeholder="Search term..."
        value={searchText}
        onChangeText={searchTextHandler}
        style={styles.searchText}
      />
      {content}
    </View>
  );
};

//set screen options for this screen only
export const screenOptions = (navData) => {
  return {
    headerTitle: "Search",
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
  screen: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  searchText: {
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "90%",
  },
});

export default SearchScreen;
