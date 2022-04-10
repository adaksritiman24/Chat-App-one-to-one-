import React from 'react'
import {useContext, useEffect, useRef} from "react";
import { SocketContext } from '../../contexts/socket';

import "./ChatBox.css";

export default function ChatBox(props) {
  
  const socket = useContext(SocketContext);
  const messageInput = useRef(null);
  
  const handleMessages =(message)=>{
    if(message.from !== props.peername)
      return
    let messages = document.getElementById("messages");
    messages.innerHTML += 
      `<div class="single-message f-start">
          <div class= "other-message">${message.text}</div>
      </div>`
    messages.scrollTop= messages.scrollHeight;  
  }

  const handleSelfMessages = (message)=> {
    const messages = document.getElementById("messages");
    messages.innerHTML += `<div class="single-message f-end">
          <div class= "self-message">${message}</div>
      </div>`
      messages.scrollTop= messages.scrollHeight;    
  }

  const resetMessagestoNewPeer = ()=>{
    document.getElementById("messages").innerHTML="";
  }

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
    handleSelfMessages(message);
  }

  useEffect(() => {
    if(props.message)
      handleMessages(props.message);
  }, [props.message]);

  useEffect(()=> {
    resetMessagestoNewPeer();

  },[props.peername])

  return (
    <div className='chatBoxArena'>
      <div className='top-bar'>{props.peername}</div>
      <div className='messages' id = "messages">

      </div>
      <form className='message-send-bar' onSubmit={sendMessage}>
        <input type='text' name="message" placeholder="Message"/>
        <button type='submit'>Send</button>
      </form>
    </div>
  );

}
