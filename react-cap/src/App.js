import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { restoreUserThunk } from './store/userStore';
import NavBar from './Components/NavBar';
import Splash from './Components/Splash';
import Gamers from './Components/Gamers';
import SingleGamer from './Components/SingleGamer';
import Auth from './Components/AuthRouteWrapper';
import FilteredPage from './Components/FilteredPage';
import AboutMe from './Components/AboutMe';
import NotFound from './Components/NotFound';
import './App.css';

function App() {
  const user = useSelector(state => state.user.user)
  const [ pageLoaded, setPageLoaded ] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(restoreUserThunk());
      // await dispatch(getGamersThunk());
      setPageLoaded(true);
    })()
  }, [dispatch])


  return pageLoaded ? (
    <BrowserRouter>
      {user?.id && <NavBar user={user}/>}
      <Switch>
        <Route path='/' exact={true}>
          <Splash />
        </Route>
        <Auth path='/gamers' exact={true}>
          <Gamers />
        </Auth>
        <Auth path='/gamers/:gamerId' exact={true}>
          <SingleGamer />
        </Auth>
        <Auth path='/filter/:param' exact={true}>
          <FilteredPage />
        </Auth>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {user?.id && <AboutMe />}
    </BrowserRouter>
  ) : null
}

export default App;
