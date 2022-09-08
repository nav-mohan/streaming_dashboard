import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import LogDisplay from "./LogDisplay";
import { SocketContextProvider } from "./SocketContext";
import StartOBSButton from "./StartOBSButton";

export default function Dashboard(){
    const {authState} = useContext(AuthContext);
    if(!authState.username || authState.exp < new Date().getTime()){
        return(<div>You need to login</div>)
    }
    else{
        return(
            <SocketContextProvider>
                <div>Go ahead man!</div>
                <StartOBSButton/>
                <LogDisplay/>
            </SocketContextProvider>
        )
    }
}