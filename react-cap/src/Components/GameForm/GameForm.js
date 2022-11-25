import { useState } from 'react';
import { postGameThunk, putGameThunk } from '../../store/gamerStore';
import { useDispatch } from 'react-redux';
import './GameForm.css';

export const genres = ['Strategy', 'Sandbox', 'First Person Shooter', 'Multiplayer Online', 'Role-Playing', 'Simulation', 'Sports', 'Puzzle', 'Adventure', 'Survival', 'Platformer'];
export const consoles = ['Playstation 4','Playstation 3', 'Xbox 1', 'Xbox 360', 'Switch', 'Wii U', 'PC'];

const GameForm = ({ onClose, game }) => {
    const [ title, setTitle ] = useState(game?.title || '');
    const [ imageUrl, setImageUrl ] = useState( null );
    const [ description, setDescription ] = useState(game?.description || '');
    const [ genre, setGenre ] = useState(game?.genre || genres[0]);
    const [ console, setConsole ] = useState(game?.console || consoles[0]);
    const [ copies, setCopies ] = useState(game?.copies || 1);
    const [ validationErrors, setValidationErrors ] = useState([]);

    const [ imageLoading, setImageLoading ] = useState(false);



    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationErrors([]);
        let form = new FormData();
        form.append("title", title);
        if (imageUrl) form.append("image_url", imageUrl);
        form.append("description", description);
        form.append("genre", genre);
        form.append("console", console);
        form.append("copies", copies);
        let newGame;
        if (imageUrl) setImageLoading(true);
        if (game) newGame = await dispatch(putGameThunk(game.id, form));
        else newGame = await dispatch(postGameThunk(form));
        if (newGame?.errors) {
            setImageLoading(false);
            return setValidationErrors(newGame.errors)
        }
        else onClose()
    }

    return (

            <form className='game-form' onSubmit={handleSubmit}>
                <ul className='validate-errors'>
                    {validationErrors?.map((err, i) => (
                        <li key={i}>{err}</li>
                    ))}
                    {imageLoading ? <li>Image uploading to AWS.</li> : null}
                </ul>
                <label htmlFor='title'>
                    Title
                    <input name='title'
                        type='text'
                        placeholder='game title'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </label>
                <label htmlFor='imageUrl'>
                    Image {game && ' *Optional'}
                    <input name='imageUrl'
                        type='file'
                        accept='image/*'
                        onChange={e => setImageUrl(e.target.files[0])}
                    />
                </label>
                <label htmlFor='description'>
                    Description
                    <textarea name='description'
                        type='text'
                        placeholder='description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </label>
                <label htmlFor='genre'>
                        Genre
                    <select name='genre' value={genre} onChange={e => setGenre(e.target.value)}>
                        {genres.map(gen => (
                            <option key={gen} value={gen}>{gen}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor='console'>
                        Console
                    <select name='console' value={console} onChange={e => setConsole(e.target.value)}>
                        {consoles.map(console => (
                            <option key={console} value={console}>{console}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor='copies'>
                    Copies
                    <input name='copies'
                        type='number'
                        min={1}
                        value={copies}
                        onChange={e => setCopies(e.target.value)}
                    />
                </label>
                <button className='game-form-btn'>Submit</button>
            </form>

    )
}

export default GameForm;
