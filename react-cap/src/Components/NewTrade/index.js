import { startTradeThunk } from '../../store/tradeStore';
import { useDispatch, useSelector } from 'react-redux';
import './NewTrade.css';



const NewTradeButton = ({ownerId, gameId}) => {
    const user = useSelector(state => state.user.user);
    const gamer = useSelector(state => state.gamers[user.id])
    const dispatch = useDispatch();

    const hasGamesToTrade = (games) => {
        for (let i = 0; i < games.length; i++) {
            if (games[i].copies_avail > 0) return true;
        };
        return false;
    };

    const handleNewTrade = () => {
        if (hasGamesToTrade(gamer?.games)) {
            dispatch(startTradeThunk(ownerId, gameId));
            alert('Trade Request Sent')
        } else return;
    };

    return (
        <button className='request-trade-btn' onClick={handleNewTrade}>Request Trade</button>
    )
}

export default NewTradeButton;
