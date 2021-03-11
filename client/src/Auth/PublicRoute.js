import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (authenticated ? (
        <Redirect to="/dashboard" />
      ) : (
        <Component {...props} {...rest} />
      ))}
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  authenticated: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
};

export default PublicRoute;