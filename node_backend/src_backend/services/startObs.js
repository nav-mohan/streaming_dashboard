const {spawn} = require('child_process');
const {BASH_START_OBS} =  require('../bash-scripts');

const startOBS = function(socket){
    const detachedOBS = spawn(
		BASH_START_OBS,
		{ 
			detached: true, 
		});

	    detachedOBS.stdout.on("data",function(e){
		    // console.log("detachedOBS data");
			// process.stdout.write(e);
			socket.emit('obs-log',{'data':e.toString()})
	    })
	    detachedOBS.stdout.on("end",function(e){
		    console.log("detachedOBS data end");
			console.log(e);
			socket.emit('obs-log','END')
	    })
	    detachedOBS.stderr.on("error",function(err){
		    console.log("detachedOBS error");
		    console.log(err);
			socket.emit('obs-log',{'error':err})
	    })
	    detachedOBS.on("close",function(close_code){
			console.log(`detachedOBS close_code ${close_code}`)
			socket.emit('obs-log',{'OBS closed with close_code':close_code.toString()})
	    })
    detachedOBS.unref();
}


module.exports={startOBS}
// startOBS();