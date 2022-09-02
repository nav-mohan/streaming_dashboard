const OBSWebSocket = require('obs-websocket-js')

class OBSManager {
    constructor(clientSocket){
        this.obsSocket = new OBSWebSocket();
        this.connectionStatus = 0;
        this.authenticationStatus = 0;
        this.obsSocket.on('AuthenticationSuccess',()=>{
            console.log('OBS authy!');
            clientSocket.emit('obs-conn-auth','OBS connected and authenticated!');
            this.authenticationStatus = 1;
        })
        this.obsSocket.on('AuthenticationFailure',()=>{
            console.log('OBS authy failed');
            clientSocket.emit('obs-conn-auth','Connected to OBS but failed authentication!');
            this.authenticationStatus = 0;
        })
        this.obsSocket.on('ConnectionOpened', function () {
            console.log("CONNECTED");
            clientSocket.emit('obs-conn-auth','Succesfully connected to OBS!');
            this.connectionStatus = 1;
        });
        this.obsSocket.on('ConnectionClosed',function(){
            console.log("DISCONNECTED");
            clientSocket.emit('obs-conn-auth','OBS disconnected!');
            this.connectionStatus = 0;
        })
        this.obsSocket.on("error",(err)=>{
            console.log("on error");
            console.log(err);
            clientSocket.emit('obs-conn-auth','OBS errored out '+err);
        })
    }

    initializeConnection = async (obsIpAddress,obsSocketPort,obsSocketPassword)=>{
        this.obsSocket.connect({
            address:obsIpAddress+":"+obsSocketPort,
            password:obsSocketPassword
        })
        .then(()=>{
            console.log('SUCCESS');
        })
        .catch((err)=>{
            console.log('OBS ERROR');
            console.log(err);
        })
    }
}

module.exports = {OBSManager}