import { useContext } from "react";
import { SocketContext } from "./SocketContext";

export default function StartOBSButton(){
    const socket = useContext(SocketContext)
    const handleClick = function(){
        socket.emit('start-obs')
    }
    return (
        <button onClick={handleClick}>Start OBS</button>
    )
}