import './App.css';

import React, { useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const [authorized, setAuthorized] = useState(false);
  const [username, setUsername] = useState("");

  const allowLogin = (username) => {
    setUsername(username);
    setAuthorized(true);
  }

  const logout = () => {
    setUsername(null);
    setAuthorized(false);
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
