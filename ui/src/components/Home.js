import Container from './left-components/Container';
import ChatBox from './right-components/ChatBox';
import React,{useState, useEffect} from "react";

import {socket, SocketContext} from "../contexts/socket";

import "./Home.css";
import Header from './top-component/Header';


export default function Home(props) {
  
  const [containerLoadCount, setcontainerLoadCount] = useState(0);
  const [peername, setPeername] = useState(null);
  const [message, setMessage] = useState(null);
  const [notificationFor, setNotificationFor] = useState({});

  const setPersonToChatBox = (newPeername) => {
    setPeername(newPeername);
    setNotificationFor({...notificationFor, [newPeername] : false});
  }

  const refreshContainer = ()=> {
    setcontainerLoadCount(containerLoadCount + 1);
  }


  useEffect(() => {

    socket.on("private-message",(message)=>{
      setNotificationFor({...notificationFor, [message.from] : true});
      setMessage(message);
      playNotificationAudio();
    })

  },[socket]);

  const playNotificationAudio = async()=> {
    const audio = new Audio("./audio/notification.wav");
    audio.play();
    console.log("Played..")
  }

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
                setPersonToChatBox = {setPersonToChatBox}
                notificationFor = {notificationFor}
                setNotificationFor = {setNotificationFor}
                />
            </div>
            <div className='right' style={{background : 'url(./imgs/bg2.jpg) center',}}>
              {peername ? 
                  <ChatBox 
                    socket = {socket}
                    peername = {peername}
                    username = {props.username}
                    message = {message}
                    /> : <></>
              }
            </div>
            </SocketContext.Provider>
        </div>
  )
}
