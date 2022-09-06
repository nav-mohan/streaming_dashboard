import React, { useEffect, useState } from "react";
import socketioclient from "socket.io-client";
import { nodeBaseUrl } from "../config";

export default function SocketConnection({authToken}) {

    const [isObsAuthy,setIsObsAuthy] = useState(false);

    const socket = socketioclient(nodeBaseUrl,{
        extraHeaders:{Authorization: authToken}
    });

    const startOBS = function(){
        console.log('starting obs')
        socket.emit('start-obs')
    }
    const stopOBS = function(){
        console.log('stoping obs')
        socket.emit('stop-obs')
    }
    const connectOBS = function(){
        console.log('connecting OBS');
        socket.emit('connect-obs')
    }

    useEffect(() => {
    
        socket.on("connect", e => {
            console.log('CONNECTED!',e)
        });
        socket.on('disconnect',(e)=>{
            console.log('DISCONNECTED!',e)
        })
        socket.on('stop-log',function(e){
            console.log('STOP-LOG RECEIVED',e)
        })
        socket.on('start-log',function(e){
            console.log('START-LOG RECEIVED',e)
        })
        socket.on('warning',function(e){
            console.log('WARNIGN RECEIVED',e)
        })

        return ()=>{
            console.log('CLOSING WEBSOCKET CONNECTION')
            socket.off('connect');
            socket.off('disconnect');
            socket.off('start-obs');
            socket.disconnect();
            socket.close();
        }
    }, []);

  return (
    <div>
        <button onClick={startOBS}>Start OBS</button>
        <button onClick={stopOBS}>Stop OBS</button>
        <button onClick={connectOBS}>Connect OBS</button>
    </div>
  )
}