import { useState, useEffect } from "react";
import { Modal } from "../../context/Modal";
import { useSelector } from 'react-redux';
import MyTrade from "./MyTrades";
import './MyTrades.css';



const MyTradesModal = ({ user }) => {
    const [ renderMyTrades, setRenderMyTrades ] = useState(false);
    const trades = useSelector(state => state.trades);


    const [ tradesWaiting, setTradesWaiting ] = useState(false);

    useEffect(() => {
        for (let trade of Object.values(trades)) {
            if (trade.recipient_id === user.id && trade.status === 'Pending') {
                setTradesWaiting(true);
                if (tradesWaiting) return
            }
        }
        // return setTradesWaiting(false)
    }, [trades])




    return (
        <div className='trades-modal-container'>
            <button className='my-trades-modal-btn' onClick={() => {
                setTradesWaiting(false)
                setRenderMyTrades(true)
                }}>My Trades</button>
            {tradesWaiting ? <div className='trade-notif'></div> : null}
            {renderMyTrades ? (
                <Modal id='trades-modal' onClose={() => setRenderMyTrades(false)}>
                    <MyTrade onClose={() => setRenderMyTrades(false)} user={user} />
                </Modal>
                ) : null
            }
        </div>

    )
};


export default MyTradesModal;
