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
import CategoryItem from "../components/news/categoryItem";

const CategoriesScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //get categories list with top news from redux store
  const news = useSelector((state) => state.topNews.categoriesNews);
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

  //get categories list with top news from redux store
  const newsByCategory = useCallback(async () => {
    setError(null);
    try {
      await dispatch(newAction.getCategoriesNews(selectedCountry));
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError, selectedCountry]);

  useEffect(() => {
    setIsLoading(true);
    newsByCategory().then(() => setTimeout(() => setIsLoading(false), 3000));
  }, [dispatch, newsByCategory]);

  //return error screen
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={newsByCategory}
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

  //navigate to the Category screen when an item is selected
  const selectItemHandler = (categoryName) => {
    props.navigation.navigate("Category", {
      country: selectedCountry,
      categoryName: categoryName,
    });
  };

  return (
    <FlatList
      data={news}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(itemData) => (
        <CategoryItem
          titleCategory={itemData.item.categoryName.toUpperCase()}
          newsSlider={itemData.item.news.slice(0, 5)}
          onSelect={() => {
            selectItemHandler(itemData.item.categoryName);
          }}
        ></CategoryItem>
      )}
    />
  );
};

//set screen options for this screen only
export const screenOptions = (navData) => {
  return {
    headerTitle: "Categories",
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

export default CategoriesScreen;
