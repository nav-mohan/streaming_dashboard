const {spawn} = require('child_process');
const {BASH_START_OBS, START_OBS_FLAGS} =  require('../bash-scripts');

const startOBS = function(io,signal){

    const detachedOBS = spawn(
		BASH_START_OBS,START_OBS_FLAGS,
		{
			detached: true,
			signal:signal
		});

	    detachedOBS.stdout.on("data",function(e){
		    // console.log("detachedOBS data");
			// process.stdout.write(e);
			io.emit('obs-log',{'data':e.toString()})
	    })
	    detachedOBS.stdout.on("end",function(e){
		    console.log("detachedOBS data end");
			console.log(e);
			io.emit('obs-log','END')
	    })
	    detachedOBS.stderr.on("error",function(err){
		    console.log("detachedOBS error");
		    console.log(err);
			io.emit('obs-log',{'error':err})
	    })
	    detachedOBS.on("close",function(close_code){
			console.log(`detachedOBS close_code ${close_code}`)
			io.emit('obs-log',{'OBS closed with close_code':close_code})
	    })
    detachedOBS.unref();
}


module.exports={startOBS}
// startOBS();