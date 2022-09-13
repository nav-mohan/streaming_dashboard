const {exec} = require('child_process')
const {BASH_GET_OBS_PID} = require('../bash-scripts');

const getPID = (socket)=>{
	message = { 'stdout': '', 'stderr': '', 'err': '' }
    exec(BASH_GET_OBS_PID, (err, stdout, stderr) => {
        message['err'] = err
        message['stderr'] = stderr
        // if(stdout.split("\n").length > 2){
            
        // }
        message['stdout'] = stdout.split("\n")
        console.log(message)
        // socket.emit('obs-log',message)

    });
}

module.exports={getPID}