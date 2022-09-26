import {
  CREATE_POST,
  DELETE_POST,
  END_LOADING,
  FETCH_ALL_POSTS,
  FETCH_BY_SEARCH,
  FETCH_POST,
  LIKE_POST,
  START_LOADING,
  UPDATE_POST,
} from "../constants/actionTypes";

export default (
  state = { isLoading: true, posts: [], numberOfPages: Number },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_POST:
      return { ...state, post: action.payload };

    case FETCH_ALL_POSTS:
      return {
        ...state,
        posts: action.payload.data,
        numberOfPages: action.payload.numberOfPages,
      };

    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };

    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };

    default:
      return state;
  }
};
