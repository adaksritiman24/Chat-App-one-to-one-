import Container from './left-components/Container';
import ChatBox from './right-components/ChatBox';
import React,{useState} from "react";

import {socket, SocketContext} from "../contexts/socket";

import "./Home.css";
import Header from './top-component/Header';


export default function Home(props) {
  
  const [containerLoadCount, setcontainerLoadCount] = useState(0);

  const refreshContainer = ()=> {
    setcontainerLoadCount(containerLoadCount + 1);
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
              <Container socket={socket} username = {props.username} loadCount = {containerLoadCount}/>
            </div>
            <div className='right'>
              <ChatBox socket = {socket}/>
            </div>
            </SocketContext.Provider>
        </div>
  )
}
