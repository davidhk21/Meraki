import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (authenticated ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to="/login" />
      ))}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  authenticated: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
};

export default PrivateRoute;
