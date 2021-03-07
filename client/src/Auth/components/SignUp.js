import React, { useReducer } from 'react';

const SignUp = () => {
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
    console.log(formValues);
  };

  return (
    <div>
      <h1>Sign Up Page!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={firstName} onChange={handleFormChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={lastName} onChange={handleFormChange} />
        </label>
        <label>
          Email:
          <input type="text" name="email" value={email} onChange={handleFormChange} />
        </label>
        <label>
          Password:
          <input type="text" name="password" value={password} onChange={handleFormChange} />
        </label>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default SignUp;
