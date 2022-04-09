import React from "react";
import {connect} from "socket.io-client";

const URL = "http://127.0.0.1:3001/";
export const socket = connect(URL);
export const SocketContext = React.createContext();