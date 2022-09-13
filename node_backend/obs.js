// const {exec} = require('child_process')
// const {BASH_GET_OBS_PID} = require('./src_backend/bash-scripts');

// const {default:OBSWebSocket} = require('obs-websocket-js')
// const obs = new OBSWebSocket();
// obs.on('Identified',(e)=>{console.log('IDENTIFIED',e)})
// obs.on('AuthenticationFailure',(e)=>{console.log('AuthenticationFailure',e)})
// obs.on('ConnectionOpened',(e)=>{console.log('ConnectionOpened',e)})
// obs.on('ConnectionClosed',(e)=>{console.log('ConnectionClosed',e)})
// obs.on('error',(e)=>{console.log('error',e)})

// obs.connect('ws://localhost:4455', '123456').then(()=>{
//     console.log("CONNECTING")
// })
// .catch((err)=>{
//     console.log("ERR",err)
// })




// const getPID = async ()=>{
// 	message = { 'stdout': '', 'stderr': '', 'err': '' }
//     const execResult = exec(BASH_GET_OBS_PID, (err, stdout, stderr) => {
//         message['err'] = err
//         message['stderr'] = stderr
//         // if(stdout.split("\n").length > 2){

//         // }
//         message['stdout'] = stdout.split("\n")
//         return (message);
//     })
//     return execResult
// }


// getPID().then((message)=>{console.log('thenning',message)})


const { spawn } = require('node:child_process');
const ps = spawn('ps', ['ax']);
const grep = spawn('grep', ['OBS']);

ps.stdout.on('data', (data) => {
    grep.stdin.write(data);
});

ps.stderr.on('data', (data) => {
  console.error(`ps stderr: ${data}`);
});
ps.on('error',(e)=>{
    console.error('Failed to run ps',e)
})

ps.on('close', (code) => {
  if (code !== 0) {
    console.log(`ps process exited with code ${code}`);
  }
  grep.stdin.end();
});

grep.stdout.on('data', (data) => {
    console.log(data.toString());
});

grep.stderr.on('data', (data) => {
  console.error(`grep stderr: ${data}`);
});

grep.on('close', (code) => {
  if (code !== 0) {
    console.log(`grep process exited with code ${code}`);
  }
});