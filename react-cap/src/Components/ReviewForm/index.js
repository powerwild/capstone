import { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewForm from './ReviewForm';


const ReviewModal = ({oldReview, formType, gamerId}) => {
    const [ renderReview, setRenderReview ] = useState(false);

    // let color = formType === 'Add' ? 'blue' : 'blue'

    return (
        <>
            <button className='new-review-btn' style={{backgroundColor:'blue'}} onClick={() => setRenderReview(true)}>{formType}</button>
            {renderReview ? (
                <Modal id='review-modal' onClose={() => setRenderReview(false)}>
                    <ReviewForm gamerId={gamerId} oldReview={oldReview} onClose={() => setRenderReview(false)}/>
                </Modal>
                ) : null
            }
        </>

    )
};


export default ReviewModal;
