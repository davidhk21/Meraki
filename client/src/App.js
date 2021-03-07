import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Authorization from './Auth/Authorization';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Authorization />
      </div>
    </BrowserRouter>
  );
};

export default App;
