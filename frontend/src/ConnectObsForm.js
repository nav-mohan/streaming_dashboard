import { useContext,useState } from "react";
import { SocketContext } from "./SocketContext";

export default function ConnectObsForm({setObsStatus}){
    const socket = useContext(SocketContext);
    const handleClick = function({
        inputObsIpAddress,
        inputObsIpPort,
        inputObsPassword
    }){
        socket.emit('connect-obs',{
            'ip':inputObsIpAddress,
            'password':inputObsPassword,
            'port':inputObsIpPort
        });
    }
    // Form fillins
    const [inputObsIpAddress,setInputObsIpAddress] = useState('');
    const [inputObsIpPort,setInputObsIpPort] = useState('');
    const [inputObsPassword,setInputObsPassword] = useState('');

    return(
        <div>
            <input 
                type='text'
                placeholder="OBS ip-address"
                value = {inputObsIpAddress} 
                onChange={(e)=>{setInputObsIpAddress(e.target.value)}}
                />
            <input 
                type='number' 
                placeholder="OBS port"
                value = {inputObsIpPort} 
                onChange={(e)=>{setInputObsIpPort(e.target.value)}}
            />
            <input 
                type='password' 
                placeholder="OBS password"
                value = {inputObsPassword} 
                onChange={(e)=>{setInputObsPassword(e.target.value)}}
            />
        <button onClick={(e)=>{
            handleClick({
                inputObsIpAddress,
                inputObsIpPort,
                inputObsPassword
                })
        }}>
            Connect OBS
        </button>
        </div>
    )
}