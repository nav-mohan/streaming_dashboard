const {spawn} = require('child_process');
const {BASH_START_OBS} =  require('../bash-scripts');

const startOBS = function(socket){
    const detachedOBS = spawn(
		BASH_START_OBS,
		{ 
			detached: true, 
		});

	    detachedOBS.on("error",function(err){
		    console.log("detachedOBS error");
		    console.log(err);
			socket.emit('start-log',{'error':err})
	    })
	    detachedOBS.on("close",function(close_code){
			console.log(`detachedOBS close_code ${close_code}`)
			socket.emit('start-log',{'OBS closed with close_code':close_code.toString()})
	    })
    detachedOBS.unref();
}


module.exports={startOBS}
// startOBS();