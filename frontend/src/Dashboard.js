import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import LogDisplay from "./LogDisplay";
import { SocketContextProvider } from "./SocketContext";
import StartStreamButton from "./StartStreamButton";
import ConnectDisconnectObs from "./ConnectDisconnectObs";
import { ObsStatusContextProvider } from "./ObsStatusContext";
import StartStopObsButton from "./StartStopOBSButton";
import ObsStatusBar from "./ObsStatusBar"

export default function Dashboard(){
    const {authState} = useContext(AuthContext);
    if(!authState.username || authState.exp < new Date().getTime()){
        return(<div>You need to login</div>)
    }
    else{
        return(
            <SocketContextProvider>
                <div>You are connected!</div>
                <ObsStatusContextProvider>
                    <ObsStatusBar/>
                    <StartStopObsButton/>
                    <ConnectDisconnectObs/>
                    <StartStreamButton/>
                    <LogDisplay/>
                </ObsStatusContextProvider>
            </SocketContextProvider>
        )
    }
}