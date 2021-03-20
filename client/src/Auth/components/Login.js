import React, { useReducer } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions.js';

const Login = (props) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const [formValues, setFormValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }), initialValues,
  );

  const { email, password } = formValues;

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/login', formValues, {
      withCredentials: true,
    })
      .then(res => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) props.setAuthenticated(accessToken);
        props.history.push('/dashboard');
      })
      .catch(err => {
        console.error(err);
      });
    setFormValues(initialValues);
  };

  return (
    <div>
      <h1>Login Page!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input type="email" name="email" value={email} onChange={handleFormChange} />
        </label>
        <label htmlFor="password">
          Password:
          <input type="text" name="password" value={password} onChange={handleFormChange} />
        </label>
        <input type="submit" value="submit" />
      </form>
      <div>
        {props.ctr}
      </div>
      <button onClick={props.onIncrementCounter}>
        increment counter
      </button>
      <button onClick={() => props.onStoreResult(props.ctr)}>
        store result
      </button>
      <ul>
        {props.storedResults.map(strResult => (
          <li key={strResult.id} onClick={() => props.onDeleteResult(strResult.id)}>{strResult.value}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ctr: state.ctr.counter,
    storedResults: state.res.results,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT, val: 5 }),
    onStoreResult: (result) => dispatch({ type: actionTypes.STORE_RESULT, result }),
    onDeleteResult: (id) => dispatch({ type: actionTypes.DELETE_RESULT, resultElId: id }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
