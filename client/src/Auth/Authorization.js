import React from 'react';
import { Route } from 'react-router-dom';

import Welcome from './components/Welcome';
import SignUp from './components/SignUp';
import Login from './components/Login';

const Authorization = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="/">Welcome</a></li>
            <li><a href="/signup">Sign Up</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
      </header>
    </div>
  );
};

export default Authorization;
