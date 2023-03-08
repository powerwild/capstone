import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { acceptTradeThunk, rejectTrade } from "../../store/tradeStore";
import AWS_OUT from '../../../AWS_OUT.jpg';



const FinishTrade = ({ onClose, trade }) => {
    const gamer = useSelector(state => state.gamers[trade.requester_id]);
    const [ validateErrors, setValidateErrors ] = useState([]);
    const dispatch = useDispatch();

    const acceptRequest = async (id) => {

        let req_game_id = id;
        const acceptedTrade = await dispatch(acceptTradeThunk(trade.id, req_game_id));
        if (acceptedTrade?.errors[0] === 'Trade has Expired') {
            dispatch(rejectTrade(id));
            return setTimeout(() => {
                onClose();
            }, 5000);
        }
        if (acceptedTrade?.errors) return setValidateErrors(acceptedTrade.errors);
        else onClose();
    };


    return (
        <div className='trade-options'>
            <ul>
                {validateErrors?.map((err, i) => (
                    <li key={i}>{err}</li>
                ))}
            </ul>
            <h2 className="finish-trade-direct">Click on the game you want to receive as a trade.</h2>
            {gamer.games.map(game => {
                if (game.copies_avail > 0) {
                    return (
                        <div className='trade-option' key={game.id} value={game.id} onClick={() => acceptRequest(game.id)}>
                            <img className='finish-trade-img' src={AWS_OUT} />
                            <div className='title-console'>
                                <div>{game.title}</div>
                                <div>{game.console}  {game.genre}</div>
                            </div>
                            <div className='trade-option-descrip'>{game.description}</div>
                        </div>
                    )
                }
            })}
            <button className='close-finish-trade-modal' onClick={() => onClose()}>Close</button>
        </div>
    )
};

export default FinishTrade;
