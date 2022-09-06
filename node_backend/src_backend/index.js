const { OBSManager } = require('./obsWebsocketManager');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const { loginRouter } 	= require("./loginRouter");
const socketIO = require('socket.io');
const {clientOrigins,serverPort} = require('./config');


const { validateToken } = require('./validateSocketToken');
const { startOBS } = require('./services/startObs');
const { stopOBS } = require('./services/stopObs');

app = express();
app.use(helmet())
app.use(cors({ origin: clientOrigins }))

// app.use(express.static('../react_frontend/build'))

let http_server = http.createServer(app);
app.use('/login',loginRouter)


let io = socketIO(http_server,{
    cors: {
        origin: clientOrigins,
        methods: ["GET", "POST"]
      }
})

io.on("connection", (socket) => {
    socket.emit('info','Verifying your login credentials');
    console.log("WEBSOCKET CONNECTED")
    const authToken = socket.handshake['headers']['authorization'];
    socket.emit('warning','WARNING!!!');
    if(!validateToken(authToken)){
        console.log('NOT GOOD - DISONNETING');
        socket.disconnect();
    }

    socket.on('start-obs',()=>{
        console.log('starting OBS');
        const authToken = socket.handshake['headers']['authorization'];
        if(!validateToken(authToken)){
            console.log('AUTH TOKEN FAILED VALIDATION - DISONNETING');
            socket.emit('warning','You are not authorized to call this. Please login again')
            socket.disconnect();
        }
        else{
            startOBS(socket)
        }
    })

    socket.on('stop-obs',()=>{
        console.log('stoping OBS');
        if(!validateToken(authToken)){
            console.log('AUTH TOKEN FAILED VALIDATION - DISONNETING');
            socket.emit('warning','You are not authorized to call this. Please login again')
            socket.disconnect();
        }
        else{
            stopOBS(socket);
        }
    })

    socket.on('connect-obs',()=>{
        const obsManager = new OBSManager(socket);
        obsManager.initializeConnection('localhost','4455','1234')
    })
    
    socket.on('start-stream',()=>{
        if(!validateToken(authToken)){
            console.log('AUTH TOKEN FAILED VALIDATION - DISONNETING');
            socket.emit('warning','You are not authorized to call this. Please login again')
            socket.disconnect();
        }
        else{
            console.log('starting stream');
        }
    })

    socket.on('disconnect',(e)=>{
        console.log('WEBSOCKET DISCONNECTED',e);
    })
  });

http_server.listen(serverPort, ()=>{
    console.log('SERVER STARTED ON ',serverPort);
})
