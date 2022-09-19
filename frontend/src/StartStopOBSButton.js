import { useContext } from "react";
import { ObsStatusContext } from "./ObsStatusContext";
import StartOBSButton from "./StartOBSButton";
import StopOBSButton from "./StopOBSButton";

export default function StartStopObsButton(){
    const {obsStatus} = useContext(ObsStatusContext);
    if(obsStatus.isRunning)
        return <StopOBSButton/>
    else
        return (<StartOBSButton/>)
}