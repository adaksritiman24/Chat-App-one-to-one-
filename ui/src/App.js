import './App.css';

import React, { useState, useContext } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import {socket} from "./contexts/socket";

function App() {
  const [authorized, setAuthorized] = useState(false);
  const [username, setUsername] = useState("");
  const [sock, setSock] = useState(socket);

  const allowLogin = (username) => {
    setUsername(username);
    setAuthorized(true);

    sock.auth = {username};
    sock.connect();

  }

  const logout = () => {
    setUsername(null);
    setAuthorized(false);
    sock.disconnect();
  }

  const LoginPage=() => <Login login = {allowLogin}/>
  const HomePage=() =>{
    return <Home username = {username} logout = {logout}/>
  }
  
  return (
    <div>
      {authorized ? HomePage() : LoginPage()}
    </div>
  )
}


export default App;
