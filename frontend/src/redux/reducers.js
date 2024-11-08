import { SET_EMAIL, SET_NAME_LAST, SET_NAME_FIRST } from "./actions";

const initialState = {
    email:null,
    firstName:null,
    lastName:null
}


function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_EMAIL:
            return { ...state, email: action.payload };
        case SET_NAME_FIRST:
            return { ...state, firstName: action.payload };
        case SET_NAME_LAST:
            return { ...state, lastName: action.payload };
        default:
            return state;
    }
}

export default userReducer;