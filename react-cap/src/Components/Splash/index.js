import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import SignupModal from "../Signup";
import LoginModal from "../Login";
import { getUserThunk } from "../../store/userStore";
import './Splash.css';


const Splash = () => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();
    const demoLogin = async () => {
        await dispatch(getUserThunk('good@gamer.com', 'password'));
    };

    return (
        <div className='splash-page'>
            <button style={{width: '9vw',height: '5vh',backgroundColor: 'cornsilk',fontSize: 'medium',fontWeight: 600,position: 'absolute',top: '5vh',right: '5vw'}} onClick={demoLogin}>Demo User</button>
            <h1 className='splash-title text'>Game Traderz</h1>
            <div className='splash-mission text'>Game Traderz is an online trading application for physical copies of games. Signup or Login to browse games other users are willing to temporarily trade.</div>
            {user?.id && <Redirect to='/gamers' />}
            <SignupModal />
            <LoginModal />
        </div>
    )
};

export default Splash;
