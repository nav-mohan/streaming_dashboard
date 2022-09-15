import { useContext, useState } from "react";
import { SocketContext } from "./SocketContext";


export default function LogDisplay(){
    
    const [obsLog,setObsLog] = useState('')
    const handleObsLog = function(e){
        setObsLog(()=>obsLog+'\n'+e.data)
    }
    const {socket} = useContext(SocketContext)
    socket.on('obs-log',handleObsLog)


    return (
        <div>
            <h4>OBS Logs -- Line Breaks!!!</h4>
            <div>{obsLog}</div>
        </div>
    )
}