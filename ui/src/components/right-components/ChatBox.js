import React from 'react'
import {useContext, useEffect, useRef} from "react";
import { SocketContext } from '../../contexts/socket';

import "./ChatBox.css";

export default function ChatBox(props) {
  
  const socket = useContext(SocketContext);
  const messageInput = useRef(null);
  

  const sendMessage = (event)=> {
    event.preventDefault();
    console.log("Message sending....");
    let message = event.target.message.value.trim();
    socket.emit("private-message", {
      text : message,
      to : props.peername,
      from : props.username,
    });
    event.target.message.value = "";

  }

  return (
    <div className='chatBoxArena'>
      <div className='top-bar'>{props.peername}</div>
      <div className='messages' id = {"messages-"+ props.peername}>

      </div>
      <form className='message-send-bar' onSubmit={sendMessage}>
        <input type='text' name="message" placeholder="Message"/>
        <button type='submit'>Send</button>
      </form>
    </div>
  );


}
