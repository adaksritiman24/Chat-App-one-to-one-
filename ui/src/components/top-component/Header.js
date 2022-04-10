import React from 'react';
import axios from "axios";
import URL from '../../contexts/url';

import "./Header.css";

export default function Header(props) {

    const connectToAndRefresh= async(event)=> {
        event.preventDefault();
        try {
            await axios.post(URL+"connect", {
                username1 : props.username,
                username2 : event.target.other.value.trim()
            });
            props.refreshContainer();
            alert("Successfully connected to "+ event.target.other.value.trim());
        }catch(e) {
            alert("User not found!");
        }
    }
  return (
    <>
    <div>
        <p>{props.username}</p>
        <hr/>
        <div>
            <button className='logoutButton' onClick={props.logout}>Logout</button>
        </div>
    </div>
    <div className='searcher'>
        <form onSubmit={connectToAndRefresh}>

            <input type="text" placeholder="Enter username to connect" name='other'></input>
            <button type='submit'>CONNECT</button>
        </form>
    </div>
    </>
  )
}
