import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import App from './App';

import countReducer from './store/reducers/counter.js';
import resultsReducer from './store/reducers/results.js';

const reducer = combineReducers({
  ctr: countReducer,
  res: resultsReducer,
})

const store = createStore(reducer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app'),
);
