import React from 'react';
import { Route } from 'react-router-dom';

const Authorization = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/signup">Sign Up</a></li>
          </ul>
        </nav>
        <Route path="/" exact render={() => <h1>Welcome</h1>} />
        <Route path="/signup" exact render={() => <h1>Sign Up</h1>} />
      </header>
    </div>
  );
};

export default Authorization;
