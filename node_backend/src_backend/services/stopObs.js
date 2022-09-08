const {exec} = require('child_process');
const {BASH_STOP_OBS} =  require('../bash-scripts');

const stopOBS = function(socket){
	message = { 'stdout': '', 'stderr': '', 'err': '' }
	try {
		exec(BASH_STOP_OBS, (err, stdout, stderr) => {
			if (err) {
				console.log('ERR')
				console.log(err)
				message['err'] = err
			}
			if (stderr) {
				console.log('STDERR')
				console.log(stderr)
				message['stderr'] = stderr
			}
			else{
				console.log('STDOUT')
				console.log(stdout)
				message['stdout'] = stdout
			}
			socket.emit('obs-log',{'data':JSON.stringify(message)})
		});
	} catch (error) {
		
	}
}


module.exports={stopOBS}
// stopOBS();