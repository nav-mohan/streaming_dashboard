// const {io}  = require( '../socket');
const {exec} = require('child_process');
const {BASH_STOP_OBS} =  require('../bash-scripts');

const stopOBS = function(){
	try {
		exec(BASH_STOP_OBS, (err, stdout, stderr) => {
			if (err) {
				console.log('ERR')
				console.log(err)
				io.emit('warning',err)
			}
			if (stderr) {
				console.log('STDERR')
				console.log(stderr)
				io.emit('info',stderr)
			}
			else{
				console.log('STDOUT')
				console.log(stdout)
				message['stdout'] = stdout
				io.emit('info',stdout)
			}
			io.emit('obs-log',{'data':JSON.stringify(message)})
		});
	} catch (error) {
		
	}
}


module.exports={stopOBS}
// stopOBS();