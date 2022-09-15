import { useContext } from "react";
import { SocketContext } from "./SocketContext";

export default function DisconnectObsButton({setObsStatus}){
    const socket = useContext(SocketContext);
    const handleClick = function(){
        socket.emit('disconnect-obs');// The backend doesnt know how to handle this yet..
    }
    return (
        <button onClick={handleClick}>Disconnect OBS</button>
    )
}