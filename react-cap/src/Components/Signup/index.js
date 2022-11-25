import SignupForm from "./SignupForm";
import { Modal } from '../../context/Modal';
import { useState } from "react";


const SignupModal = () => {
    const [ renderSignup, setRenderSignup ] = useState(false);


    return (
        <>
            <button className='signup-btn' onClick={() => setRenderSignup(true)}>Sign Up</button>
            {renderSignup ? (
                <Modal id={'signup-modal'} onClose={() => setRenderSignup(false)}>
                    <SignupForm onClose={() => setRenderSignup(false)}/>
                </Modal>
                ) : null
            }
        </>

    )
};


export default SignupModal;
