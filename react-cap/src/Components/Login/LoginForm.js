import {  useState } from 'react';
import { getUserThunk } from '../../store/userStore';
import { useDispatch } from 'react-redux';
import './Login.css';

const LoginForm = ({ onClose }) => {
    const [ credential, setCredential ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ validationErrors, setValidationErrors ] = useState([]);



    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setValidationErrors([]);
        const data = await dispatch(getUserThunk(credential, password));
        if (data?.errors) return setValidationErrors(data.errors)
        else onClose()
    };

    return (

            <form className='login-form' onSubmit={handleSubmit}>
                <ul className='validation-errors'>
                    {validationErrors?.map((err, i) => (
                        <li key={i}>{err}</li>
                    ))}
                </ul>
                <label className='credential' htmlFor='credential'>
                    Username or Email
                    <input name='credential'
                        type='text'
                        placeholder='username or email'
                        value={credential}
                        onChange={e => setCredential(e.target.value)}
                    />
                </label>
                <label className='login-password' htmlFor='password'>
                    Password
                    <input name='password'
                        type='password'
                        placeholder='a-z A-Z 0-9 ! @ # $'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <button className='login-form-btn'>Log In</button>
            </form>

    )
}

export default LoginForm;
