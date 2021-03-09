import React from 'react';
import axios from 'axios';

const Dashboard = (props) => {
  const handleLogout = () => {
    const refreshToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('refreshToken='))
      .split('=')[1];
    const options = {
      token: refreshToken,
    };
    axios.post('http://localhost:4000/logout', options, {
      withCredentials: true,
    })
      .then(res => {
        console.log('Success!', res);
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
