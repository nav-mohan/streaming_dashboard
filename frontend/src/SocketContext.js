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

    const handleConnect = function(e){
        alert('Established connection with middleman server!',e)
    };
    const handleDisconnect = function(e){
        setAuthState({'username':'','jwt':'','exp':0});
        alert('Lost connection to middleman server',e);
    }
    const handleInfo = function(e){
        console.log('INFO',e)
    }
    const handleWarning = function(e){
        console.log('WARNING',e)
    }

    useEffect(()=>{
        socket.on('connect',handleConnect)
        socket.on('disconnect',handleDisconnect)
        socket.on('info',handleInfo)
        socket.on('warning',handleWarning)

        return(()=>{
            socket.off('connect');
            socket.off('disconnect');
            socket.off('info');
            socket.off('obs-log');
            socket.off('warning');
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
