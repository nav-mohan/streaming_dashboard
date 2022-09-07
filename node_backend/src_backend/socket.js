const jwtverifier = require('jsonwebtoken')
const { Server } = require("socket.io");

const { OBSManager } = require('./obsWebsocketManager');
const { startOBS } = require('./services/startObs');
const { stopOBS } = require('./services/stopObs');
const {clientOrigins,serverPort,secretServerKey} = require('./config');

const io = new Server(serverPort,{
    cors: {
        origin: clientOrigins,
        methods: ["GET", "POST"]
      }
});
io.close();
io.use(function(socket, next){
    console.log('using use')
    if (socket.handshake.headers && socket.handshake.headers.authorization){
        jwtverifier.verify(socket.handshake.headers.authorization, secretServerKey, function(err, decoded) {
            if (err) {
                console.log('errored out',err)
                return next(new Error('Authentication error'))
            };
            console.log(decoded)
            socket.decoded = decoded;
            next();
        });
    }
    else {
        console.log('no auth headers found',socket.handshake)
        next(new Error('Authentication error'));
    }    
})

io.on("connection", (socket) => {
    socket.on('start-obs',()=>{
        console.log('starting OBS');
        startOBS(socket)
    })

    socket.on('stop-obs',()=>{
        console.log('stoping OBS');
        stopOBS(socket);
    })

    socket.on('connect-obs',()=>{
        const obsManager = new OBSManager(socket);
        obsManager.initializeConnection('localhost','4455','1234')
    })
    
    socket.on('start-stream',()=>{
        console.log('starting stream');
    })

    socket.on('disconnect',(e)=>{
        console.log('WEBSOCKET DISCONNECTED',e);
    })

  });

  module.exports={io}