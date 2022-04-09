import React from 'react'
import {useContext, useEffect, useRef} from "react";
import { SocketContext } from '../../contexts/socket';

export default function ChatBox() {
  
  const socket = useContext(SocketContext);
  const messageInput = useRef(null);
  
  useEffect(()=>{
    console.log("Socket changed");

    socket.on("recv-message",(message)=>{
      console.log(message);
    })

  },[socket])

  const sendMessage = ()=> {
    let message = messageInput.current.value;
    socket.emit("send-message",message);

  }

  return (
    <>
    <div>ChatBox</div>
    <input type='text' ref={messageInput}></input>
    <button onClick={sendMessage}>Send</button>
    </>
  );


}
