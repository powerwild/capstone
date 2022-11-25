import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { mostUsedConsole } from '../Gamers';
import '../Gamers/Gamers.css';




const FilteredPage = () => {
    const { param } = useParams();
    const gamers = useSelector(state => state.gamers)
    let filteredGamers = (Object.values(gamers)).filter(gamer => {
        let pass = false;
        for (const game of gamer.games) {
            if (game.console === param || game.genre === param) pass = true
        }
        if (pass) {
            pass = false;
            return gamer
        }
    })

    return filteredGamers.length > 0 ? (
        <div className='gamers-page'>
            <h1 className='gamers-title text'>Gamers</h1>
            <h3 className='gamers-page-mission text'>Browse these gamers to find a game you want trade for.</h3>
            {filteredGamers.map(gamer => (
                <NavLink to={`/gamers/${gamer.id}`} className='gamer-card' key={gamer.id}>
                    <div className='gamers-name'>{gamer.username}</div>
                    <div className='gamers-games'>{gamer.games.length} {gamer.games.length === 1 ? 'game' : 'games'}</div>
                    <div className='gamers-console'>Primary Console: {mostUsedConsole(gamer.games)}</div>
                </NavLink>
            ))}
        </div>
     ) : <div className='gamers-page'><h1 className='no-results text'>No game results...</h1></div>
};


export default FilteredPage;
