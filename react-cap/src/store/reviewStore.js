const GET_REVIEWS = 'reviews/GET';
const POST_REVIEW = 'reviews/POST';
const PUT_REVIEW = 'reviews/PUT';
const DELETE_REVIEW = 'reviews/DELETE';


const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
};

export const getReviewsThunk = () => async dispatch => {
    const reviewsJSON = await fetch('/api/reviews/', {method:'GET'});
    if (reviewsJSON.ok) {
        const reviews = await reviewsJSON.json();
        dispatch(getReviews(reviews.reviews));
        return reviews
    }
};


const postReview = (review) => {
    return {
        type: POST_REVIEW,
        review
    }
};

export const postReviewThunk = (gamer_id, review) => async dispatch => {
    const newReviewJSON = await fetch('/api/reviews/', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({gamer_id, review})
    });
    if (newReviewJSON.ok) {
        const newReview = await newReviewJSON.json();
        if (newReview?.errors) return newReview;
        dispatch(postReview(newReview));
        return newReview
    }
};


const putReview = (review) => {
    return {
        type: PUT_REVIEW,
        review
    }
};

export const putReviewThunk = (gamer_id, review, id) => async dispatch => {
    const updateReviewJSON = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({gamer_id, review})
    });
    if (updateReviewJSON.ok) {
        const updateReview = await updateReviewJSON.json();
        if (updateReview?.errors) return updateReview;
        dispatch(putReview(updateReview));
        return updateReview
    }
};


const deleteReview = (id) => {
    return {
        type: DELETE_REVIEW,
        id
    }
};

export const deleteReviewThunk = (id) => async dispatch => {
    const delReviewJSON = await fetch(`/api/reviews/${id}`, {method: 'DELETE'});
    if (delReviewJSON.ok) {
        const delReview = await delReviewJSON.json();
        dispatch(deleteReview(id));
        return delReview;
    }
};


const initialState = {};

const reviewReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case GET_REVIEWS:
            action.reviews.forEach(review => {
                newState[review.id] = review
            });
            return newState;
        case POST_REVIEW:
            newState[action.review.id] = action.review;
            return newState;
        case PUT_REVIEW:
            newState[action.review.id] = action.review;
            return newState;
        case DELETE_REVIEW:
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
};

export default reviewReducer;
