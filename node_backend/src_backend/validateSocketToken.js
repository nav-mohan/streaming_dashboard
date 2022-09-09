const jwtverifier = require('jsonwebtoken')
const {secretServerKey} = require('./config');

const validateSocketToken = function(socket,next){
    console.log('Validating Socket');
    if (socket.handshake.headers && socket.handshake.headers.authorization){
        jwtverifier.verify(socket.handshake.headers.authorization, secretServerKey, function(err, decoded) {
            if (err) {
                socket.disconnect()
                socket.close()        
                console.log('errored out',err)
                return next(new Error('Authentication error'));
            };
            if (decoded && decoded.iat && decoded.exp){
                if(decoded.exp*1000 < new Date().getTime()){
                    console.log('Token already expired')
                    socket.disconnect();
                    socket.close();
                    return next(new Error('Authentication error'));
                }
                console.log(decoded)
                socket.decoded = decoded;
                next();
            }
        });
    }
    else {
        socket.disconnect()
        socket.close()
        console.log('no auth headers found',socket.handshake)
        next(new Error('Authentication error'));
    }  
}

module.exports={validateSocketToken}