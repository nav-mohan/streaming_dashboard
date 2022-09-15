const OBSWebSocket = require('obs-websocket-js').default

class ObsManager {
    constructor(clientSocket){
        this.obsSocket = new OBSWebSocket();
        
        this.isConnected = 0;
        this.isAuthenticated = 0;
        this.isStreaming = 0;

        this.obsSocket.on('Identified',(e)=>{
            console.log('OBS onAuthenticationSuccess!');
            console.log(e);
            clientSocket.emit('info','Middleman server has succesfully connected to OBS and passed authentication!');
            // clientSocket.obsManager = this;
            this.isAuthenticated = 1;
        });
        this.obsSocket.on('AuthenticationFailure',(e)=>{
            console.log('OBS onAuthenticationFailure');
            console.log(e);
            clientSocket.emit('warning','Middleman server connected to OBS but failed authentication!');
            this.isAuthenticated = 0;
        });
        this.obsSocket.on('ConnectionOpened', function (e) {
            console.log("OBS onConnectionOpened");
            console.log(e);
            clientSocket.emit('info','Middleman server has opened a connection to OBS...');
            this.isConnected = 1;
        });
        this.obsSocket.on('ConnectionClosed',function(e){
            console.log("OBS onConnectionClosed");
            console.log(e);
            clientSocket.emit('warning','Middleman server has lost connection to OBS! Probably because OBS is not running');
            this.isConnected = 0;
        });
        this.obsSocket.on("error",(e)=>{
            console.log("OBS onError");
            console.log(e);
            clientSocket.emit('warning','OBS errored out ' + e);
        });
    }

    initializeConnection = (obsIpAddress,obsSocketPort,obsSocketPassword)=>{
        // this.obsSocket.connect({
        //     address:obsIpAddress+":"+obsSocketPort,
        //     password:obsSocketPassword
        // })
        
        this.obsSocket.connect(
            // `ws://${obsIpAddress}:${obsSocketPort}`,
            'ws://localhost:4455',
            obsSocketPassword
            )
        .then(()=>{
            console.log('Success!');
            return this.obsSocket.send('GetSceneList')
        })
        // .then(data=>{
        //     console.log(`${data.scenes.length} Available Scenes!`);
        //     console.log(data.scenes.map(e=>e.sources))
        // })
        .catch((error)=>{
            console.log('OBS ERROR',error);
            return new Error('Obs Error',error)
        })
    }

    closeObsSocket = ()=>{
        console.log('Disconnecting OBSWEbsocket')
        this.obsSocket.disconnect()
    }

    startStream = ()=>{

    }
}

module.exports = {ObsManager}