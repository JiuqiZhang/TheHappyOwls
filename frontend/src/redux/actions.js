export const SET_EMAIL = 'SET_EMAIL';
export const SET_NAME_FIRST = 'SET_NAME_FIRST';
export const SET_NAME_LAST = 'SET_NAME_LAST';


export const setNameFirst = name => dispatch => {
    dispatch({
        type: SET_NAME_FIRST,
        payload: name,
    });
};
export const setNameLast = name => dispatch => {
    dispatch({
        type: SET_NAME_LAST,
        payload: name,
    });
};


export const setEmail = email => dispatch => {
    dispatch({
        type: SET_EMAIL,
        payload: email,
    });
};
