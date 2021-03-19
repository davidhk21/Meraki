import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import App from './App';

import reducer from './store/reducer.js';

const store = createStore(reducer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app'),
);
