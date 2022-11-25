import { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from './LoginForm';


const LoginModal = () => {
    const [ renderLogin, setRenderLogin ] = useState(false);



    return (
        <>
            <button className='login-btn' onClick={() => setRenderLogin(true)}>Log In</button>
            {renderLogin ? (
                <Modal id={'login-modal'} onClose={() => setRenderLogin(false)}>
                    <LoginForm onClose={() => setRenderLogin(false)}/>
                </Modal>
                ) : null
            }
        </>

    )
};


export default LoginModal;
