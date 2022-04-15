import React from 'react'
import Person from './Person'
import axios from  "axios";
import { useEffect, useState } from 'react';
import URL from "../../contexts/url";

import "./Container.css";

export default function Container(props) {

  const [myConnections, setMyConnections] = useState([]);

  const refreshConnectictions = async()=>{
    console.log("Getting connections...");
    const username = props.username; 
    try {
       const response = await axios.get(URL + "connections/"+username);
  
       setMyConnections(response.data.map((peer)=> 
            <Person 
              peername ={peer.name} 
              key={peer.name}
              setPersonToChatBox = {props.setPersonToChatBox}
              notification = {props.notificationFor[peer.name]}
              />
       ));
    }
    catch(error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    
    refreshConnectictions();
  },[props.loadCount, props.notificationFor]);


  return (
    <div className='connection-container'>
       <p className='connections-h'>Connections</p>
       {myConnections}
    </div>
  )
}

export {Container};
