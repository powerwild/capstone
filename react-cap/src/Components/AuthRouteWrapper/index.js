import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";


const Auth = (props) => {
    const user = useSelector(state => state.user.user);

    return (
        <Route {...props}>
            {user ? props.children : <Redirect to='/'/>}
        </Route>
    )
}


export default Auth;
