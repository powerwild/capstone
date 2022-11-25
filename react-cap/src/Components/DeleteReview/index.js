import { useState } from "react";
import { Modal } from "../../context/Modal";
import { deleteReviewThunk } from '../../store/reviewStore';
import { useDispatch } from 'react-redux';
import './DeleteReview.css';



const DeleteReviewModal = ({id}) => {
    const [ renderDeleteReview, setRenderDeleteReview ] = useState(false);
    const dispatch = useDispatch();


    const handleDeletion = async () => {
        await dispatch(deleteReviewThunk(id)).then(setRenderDeleteReview(false));
    }


    return (
        <>
            <button className='delete-review-btn' onClick={() => setRenderDeleteReview(true)}>Delete</button>
            {renderDeleteReview ? (
                <Modal id='delete-review-modal' onClose={() => setRenderDeleteReview(false)}>
                    <div>Delete this review?</div>
                    <button onClick={handleDeletion}>Yes</button>
                    <button onClick={() => setRenderDeleteReview(false)}>No</button>
                </Modal>
                ) : null
            }
        </>

    )
};


export default DeleteReviewModal;
