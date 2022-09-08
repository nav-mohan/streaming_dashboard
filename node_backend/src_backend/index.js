const { createServer } = require("http");
const {serverPort} = require('./config');
const {io} = require('./socket')
const{app} = require('./routes')

const httpServer = createServer(app);
io.attach(httpServer);

httpServer.listen(serverPort,()=>{
    console.log('LISTENING ON ',serverPort)
});


