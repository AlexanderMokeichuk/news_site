import {NewsFromBackend} from "../../type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {getNewsFromApi} from "./newsThunks.ts";

interface NewsSlice {
  news: NewsFromBackend[],
  lauding: boolean,
}

const initialState: NewsSlice = {
  news: [],
  lauding: false,
};

const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewsFromApi.pending, (state) => {
      state.lauding = true;
    }).addCase(getNewsFromApi.fulfilled, (state, {payload: news}: PayloadAction<NewsFromBackend[]>) => {
      state.news = news;
      state.lauding = false;
    }).addCase(getNewsFromApi.rejected, (state) => {
      state.lauding = false;
    });
  },
});

export const newsReducer =  newsSlice.reducer;

export const selectNews = (state: RootState) => state.news.news;
export const selectLauding = (state: RootState) => state.news.lauding;