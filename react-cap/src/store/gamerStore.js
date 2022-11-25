const GET_GAMERS = 'gamers/GET';
const POST_GAME = 'gamers/POST';
const PUT_GAME = 'gamers/PUT';
const DELETE_GAME = 'gamers/DELETE';

const getGamers = (gamers) => {
    return {
        type: GET_GAMERS,
        gamers
    }
};

export const getGamersThunk = () => async dispatch => {
    const gamersJSON = await fetch('/api/gamers/', {method: 'GET'})
    if (gamersJSON.ok) {
        const gamers = await gamersJSON.json();
        dispatch(getGamers(gamers.gamers))
        return gamers.gamers
    }
};


const postGame = (gamer) => {
    return {
        type: POST_GAME,
        gamer
    }
};


export const postGameThunk = (gameForm) => async dispatch => {
    const newGameJSON = await fetch('/api/gamers/', {
        method: 'POST',
        body: gameForm
    });
    if (newGameJSON.ok) {
        const gamer = await newGameJSON.json();
        if (gamer?.errors) return gamer
        dispatch(postGame(gamer));
        return gamer
    }
}


const putGame = (gamer) => {
    return {
        type: PUT_GAME,
        gamer
    }
};


export const putGameThunk = (id, gameForm) => async dispatch => {
    const editGameJSON = await fetch(`/api/gamers/${id}`, {
        method: 'PUT',
        body: gameForm
    });
    if (editGameJSON.ok) {
        const gamer = await editGameJSON.json();
        if (gamer?.errors) return gamer;
        dispatch(putGame(gamer));
        return gamer
    }
};


const deleteGame = (gamer) => {
    return {
        type: DELETE_GAME,
        gamer
    }
};


export const deleteGameThunk = (id) => async dispatch => {
    const deleteGameJSON = await fetch(`/api/gamers/${id}`, {method: 'DELETE'});
    if (deleteGameJSON.ok) {
        const gamer = await deleteGameJSON.json();
        dispatch(deleteGame(gamer));
        return gamer
    }
}






const initialState = {}

const gamerReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case GET_GAMERS:
            action.gamers.forEach(gamer => {
                newState[gamer.id] = gamer
            });
            return newState;
        case POST_GAME:
            newState[action.gamer.id] = action.gamer;
            return newState;
        case PUT_GAME:
            newState[action.gamer.id] = action.gamer;
            return newState;
        case DELETE_GAME:
            newState[action.gamer.id] = action.gamer;
            return newState;
        default:
            return state;
    }
};

export default gamerReducer;
