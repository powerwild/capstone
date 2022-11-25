import { useState } from "react";
import { Modal } from "../../context/Modal";
import { deleteGameThunk } from '../../store/gamerStore';
import { useDispatch } from 'react-redux';
import './DeleteGame.css';



const DeleteGameModal = ({id}) => {
    const [ renderDeleteGame, setRenderDeleteGame ] = useState(false);
    const dispatch = useDispatch();


    const handleDeletion = async () => {
        await dispatch(deleteGameThunk(id)).then(setRenderDeleteGame(false));
    }


    return (
        <>
            <button className='delete-game-btn' onClick={() => setRenderDeleteGame(true)}>Delete</button>
            {renderDeleteGame ? (
                <Modal id='delete-game-modal' onClose={() => setRenderDeleteGame(false)}>
                    <div>Delete this game?</div>
                    <button onClick={handleDeletion}>Yes</button>
                    <button onClick={() => setRenderDeleteGame(false)}>No</button>
                </Modal>
                ) : null
            }
        </>

    )
};


export default DeleteGameModal;
