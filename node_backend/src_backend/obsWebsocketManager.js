const OBSWebSocket = require('obs-websocket-js').default

class OBSManager {
    constructor(clientSocket){
        this.obsSocket = new OBSWebSocket();
        this.connectionStatus = 0;
        this.authenticationStatus = 0;
        this.obsSocket.on('Identified',()=>{
            console.log('OBS onAuthenticationSuccess!');
            clientSocket.emit('info','Middleman server has succesfully connected to OBS and passed authentication!');
            clientSocket.obsManager = this;
            this.authenticationStatus = 1;
        });
        this.obsSocket.on('AuthenticationFailure',()=>{
            console.log('OBS onAuthenticationFailure');
            clientSocket.emit('warning','Middleman server connected to OBS but failed authentication!');
            this.authenticationStatus = 0;
        });
        this.obsSocket.on('ConnectionOpened', function () {
            console.log("OBS onConnectionOpened");
            clientSocket.emit('info','Middleman server has opened a connection to OBS...');
            this.connectionStatus = 1;
        });
        this.obsSocket.on('ConnectionClosed',function(){
            console.log("OBS onConnectionClosed");
            clientSocket.emit('warning','Middleman server has lost connection to OBS! Probably because OBS is not running');
            this.connectionStatus = 0;
        });
        this.obsSocket.on("error",(error)=>{
            console.log("OBS onError",error);
            clientSocket.emit('warning','OBS errored out ' + error);
        });
    }

    initializeConnection = (obsIpAddress,obsSocketPort,obsSocketPassword)=>{
        // this.obsSocket.connect({
        //     address:obsIpAddress+":"+obsSocketPort,
        //     password:obsSocketPassword
        // })
        
        this.obsSocket.connect(
            `ws://${obsIpAddress}:${obsSocketPort}`,
            obsSocketPassword
            )
        // .then(()=>{
        //     console.log('Success!');
        //     return this.obsSocket.send('GetSceneList')
        // })
        // .then(data=>{
        //     console.log(`${data.scenes.length} Available Scenes!`);
        //     console.log(data.scenes.map(e=>e.sources))
        // })
        .catch((error)=>{
            console.log('OBS ERROR',error);
            return new Error('Obs Error',error)
        })
    }

    startStream = ()=>{

    }
}

module.exports = {OBSManager}