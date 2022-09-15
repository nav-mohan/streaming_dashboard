import { useContext } from "react";
import { SocketContext } from "./SocketContext";

export default function StopOBSButton(){
    const {socket} = useContext(SocketContext)
    const handleClick = function(){
        socket.emit('stop-obs')
    }
    return (
        <button onClick={handleClick}>Stop OBS</button>
    )
}