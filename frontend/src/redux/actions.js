export const SET_EMAIL = 'SET_EMAIL';
export const SET_NAME_FIRST = 'SET_NAME_FIRST';
export const SET_NAME_LAST = 'SET_NAME_LAST';
export const SET_REVIEW = 'SET_REVIEW'
export const SET_TOKEN='SET_TOKEN'
export const SET_STORE='SET_STORE'
export const SET_UPDATE='SET_UPDATE'


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

export const setReview = review => dispatch => {
    dispatch({
        type: SET_REVIEW,
        payload: review,
    });
};


export const setToken = token => dispatch => {
    dispatch({
        type: SET_TOKEN,
        payload: token,
    });
};


export const setStore = store => dispatch => {
    dispatch({
        type: SET_STORE,
        payload: store,
    });
};

export const setUpdate = store => dispatch => {
    dispatch({
        type: SET_UPDATE,
        payload: store,
    });
};