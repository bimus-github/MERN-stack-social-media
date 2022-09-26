import * as api from "../api";
import {
  FETCH_ALL_POSTS,
  FETCH_BY_SEARCH,
  CREATE_POST,
  UPDATE_POST,
  LIKE_POST,
  DELETE_POST,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
} from "../constants/actionTypes";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL_POSTS, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);

    console.log(data);
    dispatch({ payload: data, type: FETCH_POST });

    dispatch({ type: END_LOADING });
  } catch (e) {
    console.log(e);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createPost(post);
    dispatch({ type: CREATE_POST, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE_POST, payload: data });

    dispatch({ type: END_LOADING });
  } catch (e) {
    console.log(e);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    await api.deletePost(id);
    dispatch({ type: DELETE_POST, payload: id });

    dispatch({ type: END_LOADING });
  } catch (e) {
    console.log(e);
  }
};

export const likePost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const user = JSON.parse(localStorage.getItem("profile"));
    const { data } = await api.likePost(post._id, user?.token);
    dispatch({ type: LIKE_POST, payload: data });

    dispatch({ type: END_LOADING });
  } catch (e) {
    console.log(e);
  }
};
