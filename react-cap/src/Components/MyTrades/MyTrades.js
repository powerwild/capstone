import { useSelector, useDispatch } from "react-redux";
import { rejectTradeThunk } from "../../store/tradeStore";
import FinishTradeModal from "../FinishTrade";
import { finishTradeThunk } from "../../store/tradeStore";


const MyTrade = ({ user, onClose }) => {
    const trades = useSelector(state => state.trades);
    const gamers = useSelector(state => state.gamers);
    const dispatch = useDispatch();

    const gameWasReturned = async (e, id) => {
        e.preventDefault();
        await dispatch(finishTradeThunk(id));
    };


    const declineRequest = async (e) => {
        e.preventDefault();
        await dispatch(rejectTradeThunk(e.target.value))
    };



    return (
        <div className='my-trades'>
            <h2>Your sent and received trade requests.</h2>
            <h4>Trades can be deleted if not in Accepted status.</h4>
            {Object.values(trades).map(trade => {
                if (trade.requester_id === user.id) {
                    return (
                        <div className='trade-container' key={trade.id}>
                            <div>Requester: {gamers[trade.requester_id].username}</div>
                            <div>Recipient: {gamers[trade.recipient_id].username}</div>
                            <div>Status: {trade.status}</div>
                            {trade.status !== 'Completed' && trade.status !== 'Accepted' && <button className="delete-trade-request" value={trade.id} onClick={(e) => declineRequest(e)}>Delete Request</button>}
                            {trade.status === 'Accepted' && trade.req_returned === false && <div>Has your game been returned to you?<button className='my-game-returned' onClick={(e) => gameWasReturned(e, trade.id)}>Yes</button></div>}
                        </div>
                    )
                } else if (trade.recipient_id === user.id) {
                    return (
                        <div className='trade-container' key={trade.id}>
                            <div>Requester: {gamers[trade.requester_id].username}</div>
                            <div>Recipient: {gamers[trade.recipient_id].username}</div>
                            <div>Status: {trade.status}</div>
                            {trade.status !== 'Completed' && trade.status !== 'Accepted' &&
                            <div className='handle-trade'>
                                <FinishTradeModal trade={trade} />
                                <button className="decline-trade" value={trade.id} onClick={(e) => declineRequest(e)}>Decline</button>
                            </div>}
                            {trade.status === 'Accepted' && trade.rec_returned === false && <div>Has your game been returned to you?<button className='my-game-returned' onClick={(e) => gameWasReturned(e, trade.id)}>Yes</button></div>}
                        </div>
                    )
                }
            })}
            <button className='close-trade-modal' onClick={() => onClose()}>Close</button>
        </div>
    )
};


export default MyTrade;
