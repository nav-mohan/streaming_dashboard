import { useContext } from "react";
import { SocketContext } from "./SocketContext";

export default function ConnectOBSButton(){
    const socket = useContext(SocketContext)
    const handleClick = function(){
        socket.emit('connect-obs',{'ip':'127.0.0.1','password':'123456','port':'4455'})
    }
    return (
        <button onClick={handleClick}>Connect OBS</button>
    )
}