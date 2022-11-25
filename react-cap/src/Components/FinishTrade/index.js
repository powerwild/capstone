import { useState } from "react";
import { Modal } from "../../context/Modal";
import FinishTrade from "./FinishTrade";
import './FinishTrade.css';



const FinishTradeModal = ({ trade }) => {
    const [ renderFinishTrade, setRenderFinishTrade ] = useState(false);


    return (
        <>
            <button className="accept-trade-btn" onClick={() => setRenderFinishTrade(true)}>Accept Trade</button>
            {renderFinishTrade ? (
                <Modal id='finish-trade-modal' onClose={() => setRenderFinishTrade(false)}>
                    <FinishTrade onClose={() => setRenderFinishTrade(false)} trade={trade} />
                </Modal>
                ) : null
            }
        </>

    )
};


export default FinishTradeModal;
