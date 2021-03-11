import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Dashboard = (props) => {
  const handleLogout = () => {
    const refreshToken = Cookies.get('refreshToken');
    const options = {
      token: refreshToken,
    };
    axios.post('http://localhost:4000/logout', options, {
      withCredentials: true,
    })
      .then(res => {
        console.log('Success!', res);
        props.setAuthenticated(false);
        props.history.push('/');
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <>
      <div>Dashboard Page!</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Dashboard;
