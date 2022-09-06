// SomeContext.js
// ---------------
import {createContext,useContext} from "react"
import socketioclient from "socket.io-client";
import { nodeBaseUrl } from "../config";
import { AuthContext } from "./AuthContextCreator";

export let socket;
export const GetSocket = function(){
    const {authToken} = useContext(AuthContext);
    socket = socketioclient(nodeBaseUrl,{
        extraHeaders:{Authorization: authToken}
    });

}

export const SomeContext = createContext();