import { useContext } from "react";
import { ObsStatusContext } from "./ObsStatusContext";

export default function ObsStatusBar(){
    const {obsStatus} = useContext(ObsStatusContext)
    return(
        <div>
            This is the status bar
            <div>Obs is running:{JSON.stringify(obsStatus.isRunning)}</div>
            <div>Obs is connected:{JSON.stringify(obsStatus.isConnected)}</div>
            <div>Obs is authenticated:{JSON.stringify(obsStatus.isAuthenticated)}</div>
            <div>Obs is streaming:{JSON.stringify(obsStatus.isStreaming)}</div>
        </div>
    )
}