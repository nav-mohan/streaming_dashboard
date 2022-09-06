import React, { useContext, useRef, createContext} from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";
import { nodeBaseUrl } from "./config";

export const SocketContext = createContext();

export const SocketContextProvider = function(props){
    const {authState} = useContext(AuthContext);

    const socket = useRef(io(nodeBaseUrl,{
        extraHeaders:{Authorization: authState.jwt}
    })).current;
    socket.on('connect',(e)=>console.log('YAY!'))
    socket.on('disconnect',(e)=>console.log('BOO!'))
    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}
