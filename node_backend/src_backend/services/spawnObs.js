const {spawn} = require('child_process');
const {BASH_START_OBS, START_OBS_FLAGS} =  require('../bash-scripts');

const spawnObs = function(io,obsStatus,signal){
	console.log(signal);
    let detachedOBS = spawn(
		BASH_START_OBS,START_OBS_FLAGS,
		{
			detached: true,
			// signal:signal
		});
		detachedOBS.on('spawn',(e)=>{
			console.log('spawned',e);
			io.emit('obs-status',{'isRunning':true});
			obsStatus.isRunning = true;
			signal.addEventListener('abort',(e)=>{
				console.log('ABORT ABORT!',e);
				detachedOBS.kill('SIGABRT');
			})
		})
		detachedOBS.on('message',(e)=>{console.log('message',e)})//havent found a use for these 
		detachedOBS.on('disconnect',(e)=>{console.log('disconnect',e)})// two event listeners

	    detachedOBS.stdout.on("data",function(e){
		    // console.log("detachedOBS data");
			// process.stdout.write(e);
			io.emit('obs-log',{'data':e.toString()})
	    })
	    detachedOBS.stderr.on("error",function(e){
		    console.log("detachedOBS error",e);
			io.emit('obs-log',{'error':e})
	    })
		detachedOBS.stdout.on("end",function(e){
		    console.log("detachedOBS data end",e);
			io.emit('obs-log',{'data':'END'})
			io.emit('obs-status',{'isRunning':false})
			obsStatus.isRunning = false;

	    })
	
	    detachedOBS.on("close",function(close_code){
			console.log(`detachedOBS close_code ${close_code}`)
			io.emit('obs-log',{'OBS closed with close_code':close_code})
			io.emit('obs-status',{'isRunning':false})
			obsStatus.isRunning = false;
	    })

    detachedOBS.unref();
}


module.exports={spawnObs}
// startOBS();