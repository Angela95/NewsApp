import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { NewsNavigator } from "./NewsNavigator";

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <NewsNavigator></NewsNavigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
