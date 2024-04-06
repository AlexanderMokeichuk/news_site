import {createAsyncThunk} from "@reduxjs/toolkit";
import {Comment, CommentFromBackend, NewsFromBackendId} from "../../type";
import axiosApi from "../../axiosApi.ts";

export const getNewsFromApiId = createAsyncThunk<NewsFromBackendId, string>(
  "comments/getFullNews",
  async (id) => {
    try {
      const {data: response} = await axiosApi.get(`/news/${id}`);
      return response;
    } catch (e) {
      return null;
    }
  },
);

export const getCommentsApi = createAsyncThunk<CommentFromBackend[], string>(
  "comments/getComments",
  async (id) => {
    try {
      const {data: response} = await axiosApi.get(`/comments/${id}`);
      return response;
    } catch (e) {
      return [];
    }
  },
);

export const addComment = createAsyncThunk<void, Comment>(
  "comments/addComment",
  async (comment) => {
    try {
      await axiosApi.post("/comments", comment);
    } catch (e) {
      console.log(e);
    }
  },
);

export const  deleteCommentApi = createAsyncThunk<void, number>(
  "news/deleteNews",
  async (id) => {
    try {
      await axiosApi.delete(`/comments/${id}`);
    } catch (e) {
      console.log(e);
    }
  },
);