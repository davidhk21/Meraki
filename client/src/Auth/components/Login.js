import React, { useReducer } from 'react';

const Login = () => {
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
    console.log(formValues);
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
    </div>
  );
};

export default Login;
