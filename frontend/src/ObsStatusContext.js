import { useContext,createContext } from "react";
import { SocketContext } from "./SocketContext";

export const ObsStatusContext = createContext(null);

export const ObsStatusContextProvider = function(props){

    const {obsStatus,setObsStatus} = useContext(SocketContext)
    return (
        <ObsStatusContext.Provider value = {{obsStatus,setObsStatus}}>
            {props.children}
        </ObsStatusContext.Provider>
    )
}