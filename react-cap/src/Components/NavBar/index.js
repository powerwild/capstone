import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTradesThunk } from '../../store/tradeStore';
import { useHistory, NavLink } from 'react-router-dom';
import { genres, consoles } from '../GameForm/GameForm';
import { logoutThunk } from '../../store/userStore';
import { getGamersThunk } from '../../store/gamerStore';
import { getReviewsThunk } from '../../store/reviewStore';
import MyTradesModal from '../MyTrades';
import './NavBar.css';


const NavBar = ({ user }) => {
    const [resorcesLoaded, setResourcesLoaded ] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        e.preventDefault();
        const logoutMess = await dispatch(logoutThunk())
        alert(logoutMess)
    };


    useEffect(() => {
        (async () => {
            await dispatch(getGamersThunk());
            await dispatch(getTradesThunk());
            await dispatch(getReviewsThunk());
            setResourcesLoaded(true);
        })();
    }, [history, dispatch])



    return resorcesLoaded && (
        <nav className='navbar'>
            <NavLink className='home-link' to='/gamers'><img className='favicon' src='https://cdn4.iconfinder.com/data/icons/geek-culture-dazzle-vol-2/256/Trading_Cards_Game-512.png' alt='Game Traders Icon' /></NavLink>
            <div className='consoles-genres'>
                <div className='consoles'>
                    {consoles.map(console => (
                        <NavLink to={`/filter/${console}`} key={console}>{console}</NavLink>
                    ))}
                </div>
                <div className='genres'>
                {genres.map(gen => (
                        <NavLink to={`/filter/${gen}`} key={gen}>{gen}</NavLink>
                    ))}
                </div>
                <div id='user-btns'>
                    <NavLink className='home-link' to={'/gamers'}>Browse for Trades</NavLink>
                    <MyTradesModal user={user}/>
                    <div>
                        <NavLink className='profile-link' to={`/gamers/${user.id}`}>Your Profile</NavLink>
                        <button className='logout-btn' onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default NavBar;
