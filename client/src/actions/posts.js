import * as api from "../api";
import {
  FETCH_ALL_POSTS,
  CREATE_POST,
  UPDATE_POST,
  LIKE_POST,
  DELETE_POST,
} from "../constants/actionTypes";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE_POST, payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE_POST, payload: id });
  } catch (e) {
    console.log(e);
  }
};

export const likePost = (post) => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("profile"));

    console.log(user?.token);

    const { data } = await api.likePost(post._id, user?.token);

    dispatch({ type: LIKE_POST, payload: data });
  } catch (e) {
    console.log(e);
  }
};
