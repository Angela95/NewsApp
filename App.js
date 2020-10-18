import { StatusBar } from "expo-status-bar";
import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import newsReducer from "./store/reducers/news";

const rootReducer = combineReducers({
  topNews: newsReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
