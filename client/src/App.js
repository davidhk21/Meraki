import React from 'react';
import { Route } from 'react-router-dom';

import Welcome from './Auth/components/Welcome';
import SignUp from './Auth/components/SignUp';
import Login from './Auth/components/Login';

import Dashboard from './Resource/Dashboard';

const App = () => {
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
      </header>
      <Route path="/" exact component={Welcome} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/login" exact component={Login} />
      <Route path="/dashboard" exact component={Dashboard} />
    </div>
  );
};

export default App;
