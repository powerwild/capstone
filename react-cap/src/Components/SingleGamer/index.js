import { useParams, Redirect, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import NewTradeButton from '../NewTrade';
import NewGameModal from '../GameForm';
import DeleteGameModal from '../DeleteGame';
import ReviewModal from '../ReviewForm';
import DeleteReviewModal from '../DeleteReview';
import './Gamer.css';




const SingleGamer = () => {
    const { gamerId } = useParams();
    const gamers = useSelector(state => state.gamers);
    const user = useSelector(state => state.user.user);
    const reviews = useSelector(state => Object.values(state.reviews));
    const [ gamer, setGamer ] = useState(gamers[gamerId]);

    const hasGamesToTrade = (games) => {
        for (let i = 0; i < games.length; i++) {
            if (games[i].copies_avail > 0) return true;
        };
        return false;
    };

    useEffect(() => {
        setGamer(gamers[gamerId])
    }, [gamerId, gamers])



    return gamer ? (
        <div className='gamer-page'>
            <div className='gamer-name text'>{gamer.username}</div>
            {user.id === gamer.id && <NewGameModal formType={'Create Game'}/>}
            <div className='gamer-games'>
                {gamer?.games.map(game => (
                    <div className='game-details' key={game.id}>
                        {/* <img className='game-image' src={game.url} /> */}
                        <h2 className='game-image'>AWS expired. Please EMPLOY to restore functionality.</h2>
                        <div className='game-copies text'>{game.copies_avail} out of {game.copies} copies</div>
                        <div className='game-title text'>{game.title}</div>
                        <div className='game-console-genre'>
                            <div className='game-console-name text'>{game.console}</div>
                            <div className='game-console-name text'>{game.genre}</div></div>
                        <div className='game-description text'>{game.description}</div>
                        {gamer.id === user.id && (
                        <>
                            <NewGameModal game={game} formType={'Edit'} />
                            {game.copies === game.copies_avail && <DeleteGameModal id={game.id} />}
                        </>)}

                        {game.copies_avail > 0 && gamer.id !== user.id && hasGamesToTrade(gamers[user.id].games) ? <NewTradeButton ownerId={game.user_id} gameId={game.id} /> : gamer.id !== user.id ? <NavLink className='trade-message' to={`/gamers/${user.id}`}>You must have a game in your collection to trade with others. CLICK HERE TO ADD GAME.</NavLink> : null}
                    </div>
                ))}
            </div>
            <div className='gamer-reviews'>
                <h2 className='gamer-reviews-title'>{gamer.username}'s reviews</h2>
                {user.id !== gamer.id && <ReviewModal formType={'Add Review'} gamerId={gamer.id}/>}
                {reviews?.reverse().map((rev, i) => {
                    if (rev.gamer_id === gamer.id) return (
                    <div key={i} className='review-container'>
                        <div className='reviewer text'>Reviewer: {gamers[rev.user_id].username}</div>
                        <div className='review text'>{rev.review}</div>
                        {rev.user_id === user.id && (
                            <div className='review-btns'>
                                <ReviewModal oldReview={rev} formType={'Edit'} gamerId={gamer.id}/>
                                <DeleteReviewModal id={rev.id}/>
                            </div>
                        )}
                    </div>
                    )
                })}
            </div>
        </div>
    ) : <Redirect to='/gamers' />
};


export default SingleGamer;
