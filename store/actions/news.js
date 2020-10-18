import CATEGORIES from "../../data/categories";
import News from "../../models/news";
import CategoryNews from "../../models/newsByCategory";
import ENV from "../../env";

export const GET_NEWS = "GET_NEWS";
export const SEARCH_NEWS = "SEARCH_NEWS";
export const GET_NEWS_FOR_CATEGORIES = "GET_NEWS_FOR_CATEGORIES";
export const GET_NEWS_BY_CATEGORY = "GET_NEWS_BY_CATEGORY";

//get api key from env file
const apiKey = ENV.newsApiKey;

//using the API above to fetch top news by country and return the list of news
export const getNews = (country) => {
  //url for API with page query options
  const url =
    "https://newsapi.org/v2/top-headlines?country=" +
    country +
    "&apiKey=" +
    apiKey;
  return async (dispatch) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      const loadedNews = [];
      //get all news articles from response
      let articles = resData.articles;

      for (const key in articles) {
        loadedNews.push(
          new News(
            Math.random().toString(),
            articles[key].title,
            articles[key].description,
            articles[key].urlToImage,
            articles[key].content
          )
        );
      }

      dispatch({ type: GET_NEWS, news: loadedNews });
    } catch (err) {
      throw err;
    }
  };
};

//using the API above to fetch top news by country and search term, return the list of news
export const searchNews = (country, searchTerm) => {
  //url for API with page query options
  const url =
    "https://newsapi.org/v2/top-headlines?country=" +
    country +
    "&q=" +
    searchTerm +
    "&apiKey=" +
    apiKey;

  return async (dispatch) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      const loadedNews = [];
      //get all news articles from response
      let articles = resData.articles;

      for (const key in articles) {
        loadedNews.push(
          new News(
            Math.random().toString(),
            articles[key].title,
            articles[key].description,
            articles[key].urlToImage,
            articles[key].content
          )
        );
      }

      dispatch({ type: SEARCH_NEWS, news: loadedNews });
    } catch (err) {
      throw err;
    }
  };
};

//using the API above to fetch top news by country and category, return the list of news for all categories
export const getCategoriesNews = (country) => {
  return async (dispatch) => {
    try {
      const newsByCat = [];

      //call API for each category from CATEGORIES list
      CATEGORIES.forEach(async (category, index, array) => {
        //url for API with page query options
        const url =
          "https://newsapi.org/v2/top-headlines?country=" +
          country +
          "&category=" +
          category.categoryName +
          "&apiKey=" +
          apiKey;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const resData = await response.json();

        const loadedNews = [];
        //get all news articles from response
        let articles = resData.articles;

        for (const key in articles) {
          loadedNews.push(
            new News(
              Math.random().toString(),
              articles[key].title,
              articles[key].description,
              articles[key].urlToImage,
              articles[key].content
            )
          );
        }

        newsByCat.push(
          new CategoryNews(category.id, category.categoryName, loadedNews)
        );

        if (index === array.length - 1) {
          dispatch({ type: GET_NEWS_FOR_CATEGORIES, news: newsByCat });
        }
      });
    } catch (err) {
      throw err;
    }
  };
};

//using the API above to fetch top news by country and category, return the list of news
export const getCategoryNews = (country, categoryName) => {
  //url for API with page query options
  const url =
    "https://newsapi.org/v2/top-headlines?country=" +
    country +
    "&category=" +
    categoryName +
    "&apiKey=" +
    apiKey;

  return async (dispatch) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      const loadedNews = [];
      //get all news articles from response
      let articles = resData.articles;

      for (const key in articles) {
        loadedNews.push(
          new News(
            Math.random().toString(),
            articles[key].title,
            articles[key].description,
            articles[key].urlToImage,
            articles[key].content
          )
        );
      }

      dispatch({ type: GET_NEWS_BY_CATEGORY, news: loadedNews });
    } catch (err) {
      throw err;
    }
  };
};
