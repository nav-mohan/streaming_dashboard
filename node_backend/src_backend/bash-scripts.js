const BASH_GET_OBS_PID 	= "ps aux | grep OBS.app | grep Applications | awk {'print $2'} ";
const BASH_START_OBS = "/Applications/OBS.app/Contents/MacOS/obs";
const START_OBS_FLAGS = ["--minimize-to-tray"];
const BASH_STOP_OBS = "kill -9 $(ps aux | grep OBS | grep Applications | awk {'print $2'}) | head -1";


module.exports = {
    BASH_GET_OBS_PID,
    BASH_START_OBS,
    START_OBS_FLAGS,
    BASH_STOP_OBS
}