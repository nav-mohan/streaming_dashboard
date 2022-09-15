import React, { useContext, createContext, useEffect,useState} from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";
import { nodeBaseUrl } from "./config";

export const SocketContext = createContext(null);

export const SocketContextProvider = function(props){
    console.log('socketprops',props);

    const [obsStatus,setObsStatus] = useState({
        'isRunning':false,
        'isConnected':false,
        'isStreaming':false,
    })

    const {authState,setAuthState} = useContext(AuthContext);

    const socket = io(nodeBaseUrl,{
        extraHeaders:{Authorization: authState.jwt}
    });

    const handleConnect = function(e){
        alert('Established connection with middleman server!',e);
        socket.emit('get-status');
    };
    const handleDisconnect = function(e,socket){
        setAuthState({'username':'','jwt':'','exp':0});
        alert('Lost connection to middleman server',e);
    };
    const handleStatus = function(e){
        console.log('receiving obs status',e)
        setObsStatus((e)=>({...obsStatus,...e}))        
        alert(JSON.stringify(e))
    }
    const handleInfo = function(e){
        alert(e);
    };
    const handleWarning = function(e){
        alert(e);
    };

    useEffect(()=>{
        socket.on('connect',(e)=>{handleConnect(e,socket)})
        socket.on('disconnect',handleDisconnect)
        socket.on('info',handleInfo)
        socket.on('warning',handleWarning)
        socket.on('obs-status',handleStatus)
    

        return(()=>{
            socket.off('connect');
            socket.off('disconnect');
            socket.off('info');
            socket.off('obs-log');
            socket.off('obs-status')
            socket.off('warning');
            socket.disconnect();
            socket.close();
        })
    },[])


    return (
        <SocketContext.Provider value={{socket,obsStatus,setObsStatus}}>
            {props.children}
        </SocketContext.Provider>
    )
}
