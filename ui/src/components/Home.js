import Container from './left-components/Container';
import ChatBox from './right-components/ChatBox';
import React,{useState, useEffect} from "react";

import {socket, SocketContext} from "../contexts/socket";

import "./Home.css";
import Header from './top-component/Header';


export default function Home(props) {
  
  const [containerLoadCount, setcontainerLoadCount] = useState(0);
  const [peername, setPeername] = useState(null);


  const refreshContainer = ()=> {
    setcontainerLoadCount(containerLoadCount + 1);
  }

  const handleMessages =(message)=>{
    console.log("Handling Message");
    console.log("Peer is :",peername, "Message from: "+message.from);
    console.log("messages-"+message.from);
    let messages = document.getElementById("messages-"+message.form);
    messages.innerHTML += `<div>${message.text}</div>`
  }


  useEffect(() => {

    setPeername(peername);

    socket.on("private-message",(message)=>{
      console.log(message);
      handleMessages(message);
    })

  }, []);

  return (

        <div className='wrapper'>
          <SocketContext.Provider value={socket}>
            <div className='header'>

              <Header
                 username={props.username} 
                 refreshContainer={refreshContainer}
                 logout={props.logout}/>
        
            </div>
            <div className='left'>

              <Container 
                socket={socket} 
                username = {props.username} 
                loadCount = {containerLoadCount}
                setPeername = {setPeername}/>
            </div>
            <div className='right'>
              {peername ? 
                  <ChatBox 
                    socket = {socket}
                    peername = {peername}
                    username = {props.username}
                    /> : <></>
              }
            </div>
            </SocketContext.Provider>
        </div>
  )
}
