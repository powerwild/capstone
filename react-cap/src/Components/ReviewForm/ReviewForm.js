import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { postReviewThunk, putReviewThunk } from '../../store/reviewStore';
import './ReviewForm.css';



const ReviewForm = ({ onClose, oldReview, gamerId}) => {
    const [ review, setReview ] = useState(oldReview?.review || '');
    const [ validationErrors, setValidationErrors ] = useState([]);
    const dispatch = useDispatch();



    const handleNewReview = async (e) => {
        e.preventDefault();
        let newReview;
        if (oldReview) {
            newReview = await dispatch(putReviewThunk(gamerId, review, oldReview.id));
        } else newReview = await dispatch(postReviewThunk(gamerId, review));
        if (newReview?.errors) return setValidationErrors(newReview.errors);
        else onClose();
    };

    return (
        <form className='review-form' onSubmit={handleNewReview}>
            <ul className='validate-errors'>
                {validationErrors?.map((err, i) => (
                    <li key={i}>{err}</li>
                ))}
            </ul>
            <label htmlFor='review'>Review</label>
            <textarea className='review-field' name='review'
                type='text'
                placeholder='Your review here'
                value={review}
                onChange={e => setReview(e.target.value)}
            />
            <button className='review-form-btn'>Submit</button>
        </form>
    )
};


export default ReviewForm;
