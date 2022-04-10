import React from 'react';
import axios from 'axios';
import URL from "../contexts/url";

export default function Login(props) {

    const handleLogin = async (event) => {
        event.preventDefault();
        var username = event.target.username.value.trim();
        
        try {
          const response = await axios.post(URL+"login", {
            username : username
          });
          console.log(response.status);

          props.login(username);
          console.log("Logged in with username: "+ username);
        }
        catch (error){
          console.log("Forbidden");
          document.querySelector('#user-reg-status-error').innerText = "User is not registered!";
        }
    }

    const handleRegistration = async (event)=> {
      event.preventDefault();
      
      var username = event.target.username.value.trim();

      try {
        const response = await axios.post(URL+"user", {
          username : username
        });

        console.log("Response :" +response);
        document.querySelector('#user-reg-status-success').innerText = "User is successfully registered!";
      }
      catch(error) {
        console.log(error);
        document.querySelector('#user-reg-status-success').innerText = "Username Already taken!";
      }
      
    }

  return (
    <div>
        <form onSubmit={handleRegistration}>
            <input type="text" name='username'/> 
            <button type='submit'>Register</button>
            <p id = "user-reg-status-success" ></p>
        </form>

        <form onSubmit={handleLogin}>
            <input type="text" name='username'/> 
            <button type='submit'>Login</button>
            <p id = "user-reg-status-error" ></p>
        </form>
    </div>
  )
}
