import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import LogDisplay from "./LogDisplay";
import { SocketContextProvider } from "./SocketContext";
import StartOBSButton from "./StartOBSButton";
import StopOBSButton from "./StopOBSButton";
import StartStreamButton from "./StartStreamButton";
import ConnectOBSButton from "./ConnectOBS";

export default function Dashboard(){
    const {authState} = useContext(AuthContext);
    if(!authState.username || authState.exp < new Date().getTime()){
        return(<div>You need to login</div>)
    }
    else{
        return(
            <SocketContextProvider>
                <div>You are connected!</div>
                <StartOBSButton/>
                <StopOBSButton/>
                <ConnectOBSButton/>
                <StartStreamButton/>
                <LogDisplay/>
            </SocketContextProvider>
        )
    }
}