import React from 'react';
import { Route } from 'react-router-dom';

import Welcome from './components/Welcome';
import SignUp from './components/SignUp';

const Authorization = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="/">Welcome</a></li>
            <li><a href="/signup">Sign Up</a></li>
          </ul>
        </nav>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" exact component={SignUp} />
      </header>
    </div>
  );
};

export default Authorization;
