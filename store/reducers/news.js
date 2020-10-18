import {
  GET_NEWS,
  GET_NEWS_BY_CATEGORY,
  GET_NEWS_FOR_CATEGORIES,
  SEARCH_NEWS,
} from "../actions/news";

const initialState = {
  topNews: [], //all news by selected country
  searchNews: [], //all news by selected country and search term
  categoriesNews: [], //all categories news
  categoryNews: [], //all news by selected country and category
};

//function that receives the current state and an action object and returns the new state: (state, action) => newState.
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS:
      return {
        ...state,
        topNews: action.news,
      };
    case SEARCH_NEWS:
      return {
        ...state,
        searchNews: action.news,
      };
    case GET_NEWS_FOR_CATEGORIES:
      return {
        ...state,
        categoriesNews: action.news,
      };
    case GET_NEWS_BY_CATEGORY:
      return {
        ...state,
        categoryNews: action.news,
      };
  }
  return state;
};
