import { useContext } from "react";
import { ObsStatusContext } from "./ObsStatusContext";
import ConnectObsForm from "./ConnectObsForm";
import DisconnectObsButton from "./DisconnectObsButton";
export default function ConnectDisconnectObs(){
    const {obsStatus,setObsStatus} = useContext(ObsStatusContext);
    if(!obsStatus.isRunning){
        return<></>
    }
    else{
        if(obsStatus.isConnected){
            return(<DisconnectObsButton setObsStatus={setObsStatus}/>)
        }
        else{
            return (<ConnectObsForm setObsStatus={setObsStatus}/>)
        }
    }
}