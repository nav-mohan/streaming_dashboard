//const {default: OBSWebSocket} = require('obs-websocket-js');
const OBSWebSocket = require('obs-websocket-js')

const obs = new OBSWebSocket();
obs.connect({ 
    address: 'localhost:4455', 
    password: '1234' 
}).then(()=>{
    console.log("CONNECTING")
})
.catch((err)=>{
    console.log("ERR",err)
})