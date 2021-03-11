import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import Welcome from './Auth/components/Welcome';
import SignUp from './Auth/components/SignUp';
import Login from './Auth/components/Login';

import Dashboard from './Resource/Dashboard';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const fetchAccessToken = () => {
    const accessToken = Cookies.get('accessToken');
    console.log(accessToken);
    if (accessToken) setAuthenticated(accessToken);
    setLoading(false);
  };

  useEffect(() => {
    fetchAccessToken();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <header>
            <nav>
              <ul>
                <li><a href="/">Welcome</a></li>
                <li><a href="/signup">Sign Up</a></li>
                <li><a href="/login">Login</a></li>
              </ul>
            </nav>
          </header>
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/signup" exact component={SignUp} />
            <Route
              path="/login"
              exact
              render={(props) => (
                <Login {...props} setAuthenticated={setAuthenticated} />
              )}
            />
            {
              authenticated ? (
                <>
                  <Route path="/dashboard" exact component={Dashboard} />
                </>
              ) : <Redirect to="/login" />
            }
          </Switch>
        </div>
      )}
    </div>
  );
};

export default App;
