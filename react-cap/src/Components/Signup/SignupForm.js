import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUserThunk } from '../../store/userStore';
import './Signup.css';



const SignupForm = ({ onClose }) => {
    const [ username, setUsername ] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ validationErrors, setValidationErrors ] = useState([]);

    const dispatch = useDispatch();

    const handleSubmit = async (e) =>  {
        e.preventDefault();
        e.stopPropagation();
        setValidationErrors([]);
        const data = await dispatch(signupUserThunk(username, email, password, confirmPassword));
        if (data?.errors) return setValidationErrors(data.errors);
        else if (!data?.errors) onClose();
    };


    return (
            <form className='signup-form' onSubmit={handleSubmit}>
                <ul className='validation-errors'>
                    {validationErrors?.map((err, i) => (
                        <li key={i}>{err}</li>
                    ))}
                </ul>
                <label className='signup-email' htmlFor='email'>
                    Email
                    <input name='email'
                        type='text'
                        placeholder='email@org.com'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label className='signup-username' htmlFor='username'>
                    Username
                    <input name='username'
                        type='text'
                        placeholder='myusername'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </label>
                <label className='signup-password' htmlFor='password'>
                    Password
                    <input name='password'
                        type='password'
                        placeholder='a-z A-Z 0-9 ! @ # $'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <label className='signup-confirm-password' htmlFor='confirmPassword'>
                    Confirm Password
                    <input name='confirmPassword'
                        type='password'
                        placeholder='a-z A-Z 0-9 ! @ # $'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </label>
                <button className='signup-form-btn'>Sign Up</button>
            </form>

    )
}

export default SignupForm;
