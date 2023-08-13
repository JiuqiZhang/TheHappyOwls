export const SET_EMAIL = 'SET_EMAIL';
export const SET_NAME = 'SET_NAME';


export const setName = name => dispatch => {
    dispatch({
        type: SET_NAME,
        payload: name,
    });
};

export const setEmail = email => dispatch => {
    dispatch({
        type: SET_EMAIL,
        payload: email,
    });
};
