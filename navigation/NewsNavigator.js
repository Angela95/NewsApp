import React from "react";
import { Platform, SafeAreaView, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

import TopNewsScreen, {
  screenOptions as topNewsScreenOptions,
} from "../screens/TopNewsScreen";
import ArticleScreen, {
  screenOptions as articleScreenOptions,
} from "../screens/ArticleScreen";
import CategoriesScreen, {
  screenOptions as categoriesScreenOptions,
} from "../screens/CategoriesScreen";
import CategoryScreen, {
  screenOptions as categoryScreenOptions,
} from "../screens/CategoryScreen";
import SearchScreen, {
  screenOptions as searchScreenOptions,
} from "../screens/SearchScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

// set stack navigator for top news
const TopNewsStackNavigator = createStackNavigator();

export const TopNewsNavigator = () => {
  return (
    <TopNewsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <TopNewsStackNavigator.Screen
        name="TopNews"
        component={TopNewsScreen}
        options={topNewsScreenOptions}
      />
      <TopNewsStackNavigator.Screen
        name="Article"
        component={ArticleScreen}
        options={articleScreenOptions}
      />
    </TopNewsStackNavigator.Navigator>
  );
};

// set stack navigator for news by category
const CategoryStackNavigator = createStackNavigator();

export const CategoryNavigator = () => {
  return (
    <CategoryStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <CategoryStackNavigator.Screen
        name="Categories"
        component={CategoriesScreen}
        options={categoriesScreenOptions}
      />
      <CategoryStackNavigator.Screen
        name="Category"
        component={CategoryScreen}
        options={categoryScreenOptions}
      />
      <CategoryStackNavigator.Screen
        name="Article"
        component={ArticleScreen}
        options={articleScreenOptions}
      />
    </CategoryStackNavigator.Navigator>
  );
};

// set stack navigator for search screen
const SearchStackNavigator = createStackNavigator();

export const SearchNavigator = () => {
  return (
    <SearchStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <SearchStackNavigator.Screen
        name="Search"
        component={SearchScreen}
        options={searchScreenOptions}
      />
      <SearchStackNavigator.Screen
        name="Article"
        component={ArticleScreen}
        options={articleScreenOptions}
      />
    </SearchStackNavigator.Navigator>
  );
};

// set drawer navigator (Top News, Category, Search)
const NewsDrawerNavigator = createDrawerNavigator();

export const NewsNavigator = () => {
  return (
    <NewsDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <NewsDrawerNavigator.Screen
        name="Top News"
        component={TopNewsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-paper" : "ios-paper"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <NewsDrawerNavigator.Screen
        name="Categories"
        component={CategoryNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-albums" : "ios-albums"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <NewsDrawerNavigator.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-search" : "ios-search"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </NewsDrawerNavigator.Navigator>
  );
};
