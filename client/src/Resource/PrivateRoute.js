import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  console.log('REST: ', rest);
  return (
    <Route
      {...rest}
      render={props => (authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      ))}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  authenticated: PropTypes.string,
};

PrivateRoute.defaultProps = {
  authenticated: false,
};

export default PrivateRoute;
