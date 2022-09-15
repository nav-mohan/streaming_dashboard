import { useContext } from "react";
import { SocketContext } from "./SocketContext";

export default function StartStreamButton(){
    const {socket} = useContext(SocketContext)
    const handleClick = function(){
        socket.emit('start-stream')
    }
    return (
        <button onClick={handleClick}>Start Stream</button>
    )
}