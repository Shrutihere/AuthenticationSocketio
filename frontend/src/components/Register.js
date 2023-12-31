import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Register = ({ socket }) => {
  const navigate = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = (e) => {
    /*Complete this function to emit the event "register" and send the username, password, and email along with it.*/
  };

  useEffect(() => {
    socket.on('registerSuccess', (data) => {
      console.log(data.message);
      localStorage.setItem('_myEmail', data.user._email);
      navigate.push('/');
    });
    socket.on('registerError', (error) => {
      console.log(error);
    });
  }, [socket]);

  if (localStorage.getItem('_myEmail')) {
    navigate.push('/photos');
  }

  return (
    <div className="register">
      <h2 style={{ marginBottom: '30px' }}>Register</h2>
      <form className="register__form" onSubmit={handleRegister}>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          className="input"
          name="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="input"
          name="username"
          id="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="input"
          name="password"
          id="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerBtn">REGISTER</button>
        <p style={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Link className="link" to="/">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
