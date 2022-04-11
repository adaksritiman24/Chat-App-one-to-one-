import React from 'react'
import {useContext, useEffect} from "react";
import { SocketContext } from '../../contexts/socket';
import axios from "axios";
import URL from "../../contexts/url";

import "./ChatBox.css";

export default function ChatBox(props) {
  
  const socket = useContext(SocketContext);
  // const messageInput = useRef(null);
  
  const handleMessages =(message)=>{
    if(message.from !== props.peername)
      return
    insertMessages(message.text,"other");
  }

  const insertMessages = (message, type)=> {
    let messages = document.getElementById("messages");
    messages.innerHTML += 
      `<div class="single-message ${type === 'self' ? 'f-end':'f-start'}">
          <div class= "${type === 'self' ? 'self-message':'other-message'}">${message}</div>
      </div>`
    messages.scrollTop= messages.scrollHeight;  
  } 


  const resetMessagestoNewPeer = async()=>{
    const messagesArea = document.getElementById("messages")
    messagesArea.innerHTML="";

    const response = await axios.get(URL+"chats?"+`A=${props.peername}&B=${props.username}`);
    
    response.data.forEach(message => {
          if(message.from===props.username) { //this person's message
            insertMessages(message.text, "self");
          }      
          else { //peer's message
            insertMessages(message.text, "other")
          }
    });
    
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
    // handleSelfMessages(message);
    insertMessages(message,"self");
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
