import {
  SET_EMAIL,
  SET_NAME_LAST,
  SET_NAME_FIRST,
  SET_REVIEW,
  SET_TOKEN,
  SET_STORE,
  SET_UPDATE,
} from "./actions";

const initialState = {
  email: null,
  firstName: null,
  lastName: null,
  review: false,
  token: null,
  store: null,
  update: true,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_REVIEW:
      return { ...state, review: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_NAME_FIRST:
      return { ...state, firstName: action.payload };
    case SET_NAME_LAST:
      return { ...state, lastName: action.payload };
    case SET_STORE:
      return { ...state, store: action.payload };
    case SET_UPDATE:
      return { ...state, update: action.payload };
    default:
      return state;
  }
}

export default userReducer;
