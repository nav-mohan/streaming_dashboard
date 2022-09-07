const { createServer } = require("http");
const {serverPort} = require('./config');
const {io} = require('./socket')
const{app} = require('./routes')

const httpServer = createServer(app);

httpServer.listen(serverPort,()=>{
    console.log('LISTENING ON ',serverPort)
}); // PORT is free to use

io.attach(httpServer);

