import { AUTH, LOGOUT } from "../constants/actionTypes";

export default (state = { data: null }, action) => {
  // console.log(action.type);
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, data: action?.data };

    case LOGOUT:
      localStorage.clear();

      return { ...state, data: null };

    default:
      return state;
  }
};
