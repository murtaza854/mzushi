import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.scss';
import Routes from './Routes';
import { Admin } from './admin';
import { AuthCheck } from './auth';
import UserContext from "./contexts/userContext";
import api from './api';

function App() {
  const [userState, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (
      async () => {
        // const response = await fetch(`${api}/admin-user/logged-in`, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   credentials: 'include',
        //   withCredentials: true,
        // });
        // const content = await response.json();
        // try {
        //   const user = content.data;
        //   setUserState(user);
        // } catch (error) {
        //   setUserState(null);
        // }
        setLoading(false)
      })();
  }, []);

  return (
    <UserContext.Provider value={{ userState: userState, setUserState: setUserState }}>
      <Router>
        <Switch>
          <Route path ="/__/auth/action">
            <AuthCheck />
          </Route>
          <Route path="/admin">
            <Admin loading={loading} />
          </Route>
          <Route path="*">
            <Routes />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
