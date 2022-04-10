import {connect} from "socket.io-client";
import React from "react";

const URL = "http://127.0.0.1:3001/";
console.log("creating socket connection");

const socket = connect(URL);
const SocketContext = React.createContext();

export {socket, SocketContext};