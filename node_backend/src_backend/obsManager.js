const { spawnObs } = require('./services/spawnObs');
const { forceQuitObs } = require('./services/forceQuitObs');
const OBSWebSocket = require('obs-websocket-js').default
const controller = new AbortController();
const { signal } = controller;

const abortEventListener = (event) => {
  console.log(signal.aborted); // true
  console.log(signal.reason); // Hello World
};

signal.addEventListener("abort", abortEventListener);
signal.removeEventListener("abort", abortEventListener);

class ObsManager {
    constructor(io){
        this.io = io;
        this.obsSocket = new OBSWebSocket();

        this.obsStatus = {
            'isRunning' : false,
            'isConnected' : false,
            'isAuthenticated' : false,
            'isStreaming' : false
        }

        this.obsSocket.on('Identified',(e)=>{
            console.log('OBS onAuthenticationSuccess!');
            console.log(e);
            this.io.emit('info','Middleman server has succesfully connected to OBS and passed authentication!');
            this.isRunning = true;// just in case the previous state update did not work
            this.isAuthenticated = true;
        });
        this.obsSocket.on('AuthenticationFailure',(e)=>{
            console.log('OBS onAuthenticationFailure');
            console.log(e);
            this.io.emit('warning','Middleman server connected to OBS but failed authentication!');
            this.isRunning = true;// just in case the previous state update did not work
            this.isAuthenticated = false;
        });
        this.obsSocket.on('ConnectionOpened', function (e) {
            console.log("OBS onConnectionOpened");
            console.log(e);
            this.io.emit('info','Middleman server has opened a connection to OBS...');
            this.isRunning = true;// just in case the previous state update did not work
            this.isConnected = true;
        });
        this.obsSocket.on('ConnectionClosed',function(e){
            console.log("OBS onConnectionClosed");
            console.log(e);
            this.io.emit('warning','Middleman server has lost connection to OBS! Probably because OBS is not running');
            this.isConnected = false;
        });
        this.obsSocket.on("error",(e)=>{
            console.log("OBS onError");
            console.log(e);
            this.io.emit('warning','OBS errored out ' + e);
        });
    }

    spawnObs = ()=>{
        if(this.obsStatus.isRunning == false){
            spawnObs(this.io,signal);
            this.obsStatus.isRunning = true;
        }
        else{
            this.io.emit('info','OBS is already running');
        }
    }

    abortObs = () => {
        if(this.obsStatus.isRunning == true){
            controller.abort("Hello World");
        }
        else{
            this.io.emit('info','OBS is not currently running');
        }
    }

    updateStatus = () => {
        // 1) Run ps aux | grep obs
        // 2) Use soem function from obs-websocket-js to check connection & authentication status
        // update this.obsStatus
    }

    initializeConnection = (obsIpAddress,obsSocketPort,obsSocketPassword)=>{
        this.obsSocket.connect(
            `ws://${obsIpAddress}:${obsSocketPort}`,
            obsSocketPassword
            )
        .then(()=>{
            console.log('Success!');
            return this.obsSocket.send('GetSceneList')
        })
        .then(data=>{
            console.log(`${data.scenes.length} Available Scenes!`);
            console.log(data.scenes.map(e=>e.sources))
        })
        .catch((error)=>{
            console.log('OBS ERROR',error);
            return new Error('Obs Error',error)
        })
    }

    closeObsSocket = ()=>{
        console.log('Disconnecting OBSWEbsocket')
        this.obsSocket.disconnect()
    }

    // forceQuitObs = ()=>{} // uses shell script exec to stop obs (use this when node crashes and is no longer connected to OBS child_process)
    // startStream = ()=>{}
    // stopStream = ()=>{}
    // changeScene = (newScene)=>{}

}

module.exports = {ObsManager}