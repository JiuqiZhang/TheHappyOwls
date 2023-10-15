export const SET_EMAIL = 'SET_EMAIL';
export const SET_NAME_FIRST = 'SET_NAME_FIRST';
export const SET_NAME_LAST = 'SET_NAME_LAST';


export const setNameFirst = firstName => dispatch => {
    dispatch({
        type: SET_NAME_FIRST,
        payload: firstName,
    });
};
export const setNameLast = lastName => dispatch => {
    dispatch({
        type: SET_NAME_LAST,
        payload: lastName,
    });
};


export const setEmail = email => dispatch => {
    dispatch({
        type: SET_EMAIL,
        payload: email,
    });
};
