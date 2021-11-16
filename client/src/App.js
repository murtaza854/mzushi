import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.scss';
import Routes from './Routes';
import { Admin } from './admin';
import UserContext from "./contexts/userContext";
// import Auth from './auth/Auth';
import api from './api';
import { PreLoader } from './components';

function App() {
  const [userState, setUserState] = useState('loading');
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch(`${api}/logged-in`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            withCredentials: true,
          });
          const content = await response.json();
          const user = content.data;
          const { displayName, email, emailVerified, accountSetup, admin, provider } = user;
          console.log(user)
          setTimeout(() => {
            document.getElementById('pre-loader-custom').classList.add('fade-away');
            setUserState({ displayName, email, emailVerified, accountSetup, admin, provider });
          }, 4000);
          // setLoading(false);
        } catch (error) {
          setTimeout(() => {
            document.getElementById('pre-loader-custom').classList.add('fade-away');
            setUserState(null);
          }, 4000);
          // setLoading(false);
        }
      })();
  }, []);

  // if (loading) return <div></div>
  // if (userState === 'loading') return <PreLoader className="" />;

  return (
    <UserContext.Provider value={{ userState: userState, setUserState: setUserState }}>
      {
        userState === 'loading' ? null : (
          <Router>
            <Switch>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="*">
                <div id="overlay" className="overlay"></div>
                <Routes />
              </Route>
            </Switch>
          </Router>
        )
      }
      <PreLoader id="pre-loader-custom" />
    </UserContext.Provider>
  );
}

export default App;
