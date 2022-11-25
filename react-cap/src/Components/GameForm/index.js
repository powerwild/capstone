import { useState } from "react";
import { Modal } from "../../context/Modal";
import GameForm from "./GameForm";



const NewGameModal = ({game, formType}) => {
    const [ renderNewGame, setRenderNewGame ] = useState(false);


    return (
        <>
            <button className='new-game-btn' onClick={() => setRenderNewGame(true)}>{formType}</button>
            {renderNewGame ? (
                <Modal id='game-modal' onClose={() => setRenderNewGame(false)}>
                    <GameForm game={game} onClose={() => setRenderNewGame(false)}/>
                </Modal>
                ) : null
            }
        </>

    )
};


export default NewGameModal;
