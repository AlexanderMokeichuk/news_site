import {createAsyncThunk} from "@reduxjs/toolkit";
import {News, NewsFromBackend} from "../../type";
import axiosApi from "../../axiosApi.ts";

export const getNewsFromApi = createAsyncThunk<NewsFromBackend[], undefined>(
  "news/getNews",
  async () => {
    try {
      const {data: response} = await axiosApi.get("/news");
      return response;
    } catch (e) {
      return[];
    }
  },
);

export const addNews = createAsyncThunk<void, News>(
  "news/addNews",
  async (news) => {
    const formData = new FormData();

    const keys = Object.keys(news) as (keyof News)[];
    keys.forEach((key) => {
      const value = news[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    try {
      await axiosApi.post("/news", formData);
    } catch (e) {
      console.log(e);
    }
  },
);

export const  deleteNews = createAsyncThunk<void, number>(
  "news/deleteNews",
  async (id) => {
    try {
      await axiosApi.delete(`/news/${id}`);
    } catch (e) {
      console.log(e);
    }
  },
);