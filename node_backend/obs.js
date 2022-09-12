const {default:OBSWebSocket} = require('obs-websocket-js')
const obs = new OBSWebSocket();
obs.on('Identified',(e)=>{console.log('IDENTIFIED',e)})
obs.on('AuthenticationFailure',(e)=>{console.log('AuthenticationFailure',e)})
obs.on('ConnectionOpened',(e)=>{console.log('ConnectionOpened',e)})
obs.on('ConnectionClosed',(e)=>{console.log('ConnectionClosed',e)})
obs.on('error',(e)=>{console.log('error',e)})

console.log(obs);


obs.connect('ws://localhost:4455', '123456').then(()=>{
    console.log("CONNECTING")
})
.catch((err)=>{
    console.log("ERR",err)
})