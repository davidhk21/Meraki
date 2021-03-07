import React, { useReducer } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const SignUp = (props) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const [formValues, setFormValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }), initialValues,
  );

  const { firstName, lastName, email, password } = formValues;

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/signup', formValues)
      .then(res => {
        console.log(res);
        console.log('User has been signed up!');
        props.history.push('/login');
      })
      .catch(err => {
        console.error(err);
      });
    setFormValues(initialValues);
  };

  return (
    <div>
      <h1>Sign Up Page!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first-name">
          First Name:
          <input type="text" name="firstName" value={firstName} onChange={handleFormChange} />
        </label>
        <label htmlFor="last-name">
          Last Name:
          <input type="text" name="lastName" value={lastName} onChange={handleFormChange} />
        </label>
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
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default SignUp;
