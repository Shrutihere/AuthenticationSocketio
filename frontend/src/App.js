import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { io } from 'socket.io-client';
import Photos from './components/Photos';
import Login from './components/Login';
import Register from './components/Register';
import UploadPhoto from './components/UploadPhoto';

const socket = io.connect(`https://he-ide.hackerearth.com`, {
  path: `/${process.env.REACT_APP_HASH}.backend/socket.io/`,
});

function App() {
  return (
    <>
      <Router basename={`/${process.env.REACT_APP_HASH}/`}>
        <Switch>
          <Route exact path="/">
            <Login socket={socket} />
          </Route>
          <Route exact path="/register">
            <Register socket={socket} />
          </Route>
          <Route exact path="/photos">
            <Photos socket={socket} />
          </Route>
          <Route exact path="/photo/upload">
            <UploadPhoto socket={socket} />
          </Route>
          <Route exact path="*">
            <h1>404 Not Found!</h1>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
