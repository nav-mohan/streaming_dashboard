const { Server } = require("socket.io");
const { ObsManager } = require('./obsManager');

const {clientOrigins,nodeServerPort} = require('./config');
const {validateSocketToken} = require('./validateSocketToken');

const obsStatus = {
    'isRunning':false,
    'isConnected':false,
    'isStreaming':false
}

const io = new Server(nodeServerPort,{
    cors: {
        origin: clientOrigins,
        methods: ["GET", "POST"]
      }
});
io.close();
io.use(validateSocketToken)
const obsManager = new ObsManager(io);//A single OBSManager for all incoming connections

io.on("connection", (socket) => {
    console.log('WEBSOCKET CONNECTED!')

    socket.emit('obs-status',obsManager.obsStatus);

    socket.on('start-obs',()=>{
        console.log('starting OBS');
        obsManager.startObs()
    })

    socket.on('stop-obs',()=>{
        console.log('stoping OBS');
        obsManager.stopObs();
    })

    socket.on('connect-obs',(e)=>{
        console.log('connecting to obs',e)
        if(e && e.ip && e.password && e.port){
            socket.obsManager = true;
            obsManager.initializeConnection(e.ip,e.port,e.password);
            return ;
        }
        else{
            socket.emit('warning','You need to provide username password and port# for obs connection');
            return ;
        }
    })

    socket.on('disconnect-obs',()=>{
        if(socket.obsManager){
            obsManager.closeObsSocket();
            return;
        }
    })
    
    socket.on('start-stream',()=>{
        if(socket.obsManager){
            console.log('starting stream',socket.obsManager);
            return;
        }
        else{
            socket.emit('warning','Your connection to the Middleman server is not being relayed to OBS for some reason... Probably because OBS is not running.');
            return;
        }
    })

    socket.on('disconnect',(e)=>{
        console.log('WEBSOCKET DISCONNECTED',e);
        // socket.obsManager.closeObsSocket();
        if(socket.obsManager){
            socket.obsManager.closeObsSocket()
        }
    })

  });

  module.exports={io}