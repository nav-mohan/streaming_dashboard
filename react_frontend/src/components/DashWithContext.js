// App.js
// -------
import {HomeWithContext} from "./HomeContext";
import {AboutWithContext} from "./AboutContext";
import {SomeContext,socket} from "./SomeContext";
import { useEffect, useMemo, useState } from "react";
import { nodeBaseUrl } from "../config";

export default function DashWithContext({authToken,username}){
    const [socketState, setSocketState] = useState(false);

    const [someValue,setSomeValue] = useState(null);

    const memsome_value = useMemo(()=>{
        console.log('memsome_value',someValue);
        return ({someValue,setSomeValue})
    },[someValue,setSomeValue]);

    useEffect(()=>{
        console.log('socketState=',socketState);
        if(socketState){
            setSomeValue(socket)
            socket.connect(nodeBaseUrl)
        }
    },[socketState])

	return(
		<div>
            <button onClick={() => setSocketState(!socketState)}>
                {socketState ? "Disconnect from server" : "Connect to server"}
            </button>
            {socketState ? 
			<SomeContext.Provider value = {memsome_value}>
                <HomeWithContext/>
                <AboutWithContext/>
			</SomeContext.Provider>
            : null}
		</div>
	)

}