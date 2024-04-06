import {CommentFromBackend, NewsFromBackend, NewsFromBackendId} from "../../type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {getCommentsApi, getNewsFromApiId} from "./commentsThuncks.ts";

interface CommentsSlice {
  fullNews: NewsFromBackend | null,
  comments: CommentFromBackend[],
  laudingComments: boolean,
}

const initialState: CommentsSlice = {
  fullNews: null,
  comments: [],
  laudingComments: false,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewsFromApiId.fulfilled, (state, {payload: fullNews}: PayloadAction<NewsFromBackendId>) => {
      state.fullNews = fullNews;
    });

    builder.addCase(getCommentsApi.pending, (state) => {
      state.laudingComments = true;
    }).addCase(getCommentsApi.fulfilled, (state, {payload: comments}: PayloadAction<CommentFromBackend[]>) => {
      state.comments = comments;
      state.laudingComments = false;
    }).addCase(getCommentsApi.rejected, (state) => {
      state.laudingComments = false;
    });
  },
});

export const  commentsReducer = commentsSlice.reducer;

export const selectFullNews = (state: RootState) => state.comments.fullNews;
export const selectComments = (state: RootState) => state.comments.comments;
export const selectLaudingComments = (state: RootState) => state.comments.laudingComments;

