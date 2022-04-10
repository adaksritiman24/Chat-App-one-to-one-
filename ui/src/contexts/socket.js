import {io} from "socket.io-client";
import React from "react";

const URL = "http://127.0.0.1:3001/";

const socket = io(URL, { autoConnect : false});
const SocketContext = React.createContext();

export {socket, SocketContext};