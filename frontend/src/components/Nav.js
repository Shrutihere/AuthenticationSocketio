import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Nav = () => {
  const navigate = useHistory();
  function logoutHandler(e) {
    e.preventDefault();
    console.log('clicked');
    localStorage.removeItem('_myEmail');
    navigate.push('/');
  }
  return (
    <nav className="navbar">
      <h3>PhotoShare</h3>
      <div className="nav__BtnGroup">
        <Link to="/photos" style={{ marginRight: '10px' }}>
          All Photos
        </Link>
        <Link to="/photo/upload">Upload Photo</Link>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </nav>
  );
};

export default Nav;
