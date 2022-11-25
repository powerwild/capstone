import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getGamersThunk } from '../../store/gamerStore';
import './Gamers.css';


export const mostUsedConsole = (games) => {
    let obj = {
        'Playstation 4': 0,
        'Playstation 3': 0,
        'Xbox 1': 0,
        'Xbox 360': 0,
        'Switch': 0,
        'Wii U': 0,
        'PC': 0
    }
    games.forEach(game => {
        obj[game.console] += 1;
    });
    let entries = Object.entries(obj);
    let curr = entries[0];
    entries.forEach(entry => {
        if (entry[1] > curr[1]) curr = entry;
    })
    return curr[0];
}


const Gamers = () => {
    const gamers = useSelector(state => state.gamers);
    const [ loaded, setLoaded ] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(getGamersThunk());
            setLoaded(true)
        })()
    }, [dispatch])

    return loaded ? (
            <div className='gamers-page'>
                <h1 className='gamers-title text'>Gamers</h1>
                <h3 className='gamers-page-mission text'>Browse these gamers to find a game you want trade for.</h3>
                {Object.values(gamers).map(gamer => (
                    <NavLink to={`/gamers/${gamer.id}`} className='gamer-card' key={gamer.id}>
                        <div className='gamers-name'>{gamer.username}</div>
                        <div className='gamers-games'>{gamer.games.length} {gamer.games.length === 1 ? 'game' : 'games'}</div>
                        <div className='gamers-console'>Primary Console: {mostUsedConsole(gamer.games)}</div>
                    </NavLink>
                ))}
            </div>
    ) : null
}


export default Gamers;
