const GET = 'user/GET';
const DELETE = 'user/DELETE';

export const getUser = (user) => {
    return {
        type: GET,
        user
    }
};

export const getUserThunk = (credential, password) => async (dispatch) => {
    const loginJSON = await fetch('/api/users/login', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({credential, password})
    })
    if (loginJSON.ok) {
        const data = await loginJSON.json();
        if (data?.errors) return data
        dispatch(getUser(data));
        return data;
    }
};

export const restoreUserThunk = () => async (dispatch) => {
    const userJSON = await fetch('/api/users/auth');

    if (userJSON.ok) {
        const data = await userJSON.json();
        if (data?.errors) return data.errors
        dispatch(getUser(data || null));
        return data;
    }
};

export const signupUserThunk = (username, email, password, confirm_password) => async (dispatch) => {
    const signupJSON = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({username, email, password, confirm_password})
    });
    if (signupJSON.ok) {
        const data = await signupJSON.json();
        if (data?.errors) return data
        dispatch(getUser(data));
        return data;
    }
}



 const removeUser = () => {
    return {
        type: DELETE
    }
};

export const logoutThunk = () => async (dispatch) => {
    const logoutJSON = await fetch('/api/users/logout', {
        method: 'GET'
    })
    if (logoutJSON.ok) {
        const logoutMessage = await logoutJSON.json();
        dispatch(removeUser());
        return logoutMessage.message;
    }
}


const initialState = {user: null};

const userReducer = ( state = initialState, action ) => {
    let newState = {...state};
    switch (action.type) {
        case GET:
            newState.user = action.user;
            return newState;
        case DELETE:
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default userReducer;
