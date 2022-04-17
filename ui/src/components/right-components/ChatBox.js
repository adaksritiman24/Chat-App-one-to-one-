import React from 'react'
import {useContext, useEffect} from "react";
import { SocketContext } from '../../contexts/socket';
import axios from "axios";
import URL from "../../contexts/url";
import moment from "moment";  


import "./ChatBox.css";

export default function ChatBox(props) {
  
  const socket = useContext(SocketContext);
  // const messageInput = useRef(null);
  
  const handleMessages =(message)=>{
    if(message.from !== props.peername)
      return
    insertMessages(message.text,"other", message.date);
  }

  const insertMessages = (message, type, time=1650160786)=> {
    let messages = document.getElementById("messages");
    messages.innerHTML += 
      `<div class="single-message ${type === 'self' ? 'f-end':'f-start'}">
          <div class= "${type === 'self' ? 'self-message':'other-message'}">
          <div>${message}<div>
          <div class="timestamp">${moment.unix(time).format('MMM Do YYYY, h:mm A')}<div>
          </div>
      </div>`
    messages.scrollTop= messages.scrollHeight;  
  } 


  const resetMessagestoNewPeer = async()=>{
    
    const messagesArea = document.getElementById("messages")
    messagesArea.innerHTML="";

    const response = await axios.get(URL+"chats?"+`A=${props.peername}&B=${props.username}`);
    
    response.data.forEach(message => {
          if(message.from===props.username) { //this person's message
            insertMessages(message.text, "self", message.date);
          }      
          else { //peer's message
            insertMessages(message.text, "other", message.date);
          }
    });
    
  }

  const sendMessage = (event)=> {
    event.preventDefault();
    console.log("Message sending....");
    let message = event.target.message.value.trim();
    const currentTime = Math.round((new Date).getTime() /1000);
    socket.emit("private-message", {
      text : message,
      to : props.peername,
      from : props.username,
      date :  currentTime,
    });
    event.target.message.value = "";
    // handleSelfMessages(message);
    insertMessages(message,"self", currentTime);
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
        <input type='text' name="message" placeholder="Message" id="message-box"/>
        <button type='submit'><i class="fa-solid fa-paper-plane"></i></button>
      </form>
    </div>
  );

}
