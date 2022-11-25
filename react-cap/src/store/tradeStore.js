const GET_TRADES = 'trades/GET';
const START_TRADE = 'trades/START';
const ACCEPT_TRADE = 'trades/ACCEPT';
const FINISH_TRADE = 'trades/FINISH';
const REJECT_TRADE = 'trades/REJECT';


const getTrades = (trades) => {
    return {
        type: GET_TRADES,
        trades
    }
};


export const getTradesThunk = () => async dispatch => {
    const tradesJSON = await fetch('/api/trades/', {method: 'GET'})
    if (tradesJSON.ok) {
        const trades = await tradesJSON.json();
        dispatch(getTrades(trades.trades));
        return trades.trades
    }
};


const startTrade = (trade) => {
    return {
        type: START_TRADE,
        trade
    }
};

export const startTradeThunk = (recipient_id, rec_game_id) => async dispatch => {
    const newTradeJSON = await fetch('/api/trades/', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({recipient_id, rec_game_id})
    });
    if (newTradeJSON.ok) {
        const newTrade = await newTradeJSON.json();
        if (newTrade?.errors) return newTrade.errors;
        dispatch(startTrade(newTrade));
        return newTrade
    }
};


const acceptTrade = (trade) => {
    return {
        type: ACCEPT_TRADE,
        trade
    }
};


export const acceptTradeThunk = (id, req_game_id) => async dispatch => {
    const acceptedTradeJSON = await fetch(`/api/trades/${id}`, {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({req_game_id})
    });
    if (acceptedTradeJSON.ok) {
        const acceptedTrade = await acceptedTradeJSON.json();
        if (acceptedTrade?.errors) return acceptedTrade.errors;
        dispatch(acceptTrade(acceptedTrade));
        return acceptedTrade
    }
};


const finishTrade = (trade) => {
    return {
        type: FINISH_TRADE,
        trade
    }
};

export const finishTradeThunk = (id) => async dispatch => {
    const finishedTradeJSON = await fetch(`/api/trades/${id}`, {
        method: 'PATCH',
    });
    if (finishedTradeJSON.ok) {
        const finishedTrade = await finishedTradeJSON.json();
        if (finishedTrade.status === 'Completed') dispatch(rejectTrade(finishedTrade.id));
        else dispatch(finishTrade(finishedTrade));
        return finishedTrade
    }
};


export const rejectTrade = (id) => {
    return {
        type: REJECT_TRADE,
        id
    }
};


export const rejectTradeThunk = (id) => async dispatch => {
    const badTradeJSON = await fetch(`/api/trades/${id}`, {
        method: 'DELETE'
    });
    if (badTradeJSON.ok) {
        const badTrade = await badTradeJSON.json();
        dispatch(rejectTrade(id));
        return badTrade
    }
};



const initialState = {};


const tradeReducer = (state=initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case GET_TRADES:
            action.trades.forEach(trade => {
                newState[trade.id] = trade
            });
            return newState;
        case START_TRADE:
            newState[action.trade.id] = action.trade;
            return newState;
        case ACCEPT_TRADE:
            newState[action.trade.id] = action.trade;
            return newState;
        case FINISH_TRADE:
            newState[action.trade.id] = action.trade;
            return newState;
        case REJECT_TRADE:
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
};

export default tradeReducer;
