import { useContext } from "react";
import { SocketContext } from "./SocketContext";

export default function ConnectOBSButton(){
    const socket = useContext(SocketContext)
    const handleClick = function(){
        socket.emit('connect-obs',{'ip':'localhost','password':'1234','port':'4455'})
    }
    return (
        <button onClick={handleClick}>Connect OBS</button>
    )
}