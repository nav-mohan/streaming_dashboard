import React, { useContext, useRef, createContext, useEffect} from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";
import { nodeBaseUrl } from "./config";

export const SocketContext = createContext(null);

export const SocketContextProvider = function(props){

    const {authState,setAuthState} = useContext(AuthContext);
    // const socket = useRef(io(nodeBaseUrl,{
    //     extraHeaders:{Authorization: authState.jwt}
    // })).current;
    const socket = io(nodeBaseUrl,{
        extraHeaders:{Authorization: authState.jwt}
    })

    useEffect(()=>{
        socket.on('connect',(e)=>alert('Established connection with middleman server!'))
        socket.on('disconnect',(e)=>{
            setAuthState({
                'username':'',
                'jwt':'',
                'exp':0
                })
            alert('Lost connection to middleman server')
        })
        return(()=>{
            socket.off('connect');
            socket.off('disconnect');
            socket.disconnect();
            socket.close();
        })
    },[])


    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}
