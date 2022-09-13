const { Server } = require("socket.io");
const { OBSManager } = require('./obsWebsocketManager');
const { startOBS } = require('./services/startObs');
const { stopOBS } = require('./services/stopObs');
const {clientOrigins,nodeServerPort} = require('./config');
const {validateSocketToken} = require('./validateSocketToken');
const { getPID } = require("./services/getPID");

const io = new Server(nodeServerPort,{
    cors: {
        origin: clientOrigins,
        methods: ["GET", "POST"]
      }
});
io.close();
io.use(validateSocketToken)

io.on("connection", (socket) => {
    console.log('WEBSOCKET CONNECTED!')

    socket.on('get-pid',()=>{
        console.log('GETTING PID');
        getPID(socket)
    })

    socket.on('start-obs',()=>{
        console.log('starting OBS');
        startOBS(socket)
    })

    socket.on('stop-obs',()=>{
        console.log('stoping OBS');
        stopOBS(socket);
    })

    socket.on('connect-obs',(e)=>{
        console.log('connecting to obs',e)
        if(e && e.ip && e.password && e.port){
            socket.obsManager = new OBSManager(socket);
            socket.obsManager.initializeConnection(e.ip,e.port,e.password);
            return ;
        }
        else{
            socket.emit('warning','You need to provide username password and port# for obs connection');
            return ;
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