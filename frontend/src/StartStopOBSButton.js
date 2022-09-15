import { useContext } from "react";
import { ObsStatusContext } from "./ObsStatusContext";
import StartOBSButton from "./StartOBSButton";
import StopOBSButton from "./StopOBSButton";

export default function StartStopObsButton(){
    const {obsStatus,setObsStatus} = useContext(ObsStatusContext);
    if(obsStatus.isRuning)
        return <StopOBSButton/>
    else
        return (<StartOBSButton/>)
}