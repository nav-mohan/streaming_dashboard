const http = require("http");
const {nodeServerPort} = require('./config');
const {io} = require('./socket')
const{app} = require('./routes')

const httpServer = http.createServer(app);

io.attach(httpServer);

httpServer.listen(nodeServerPort,()=>{
    console.log('HTTP LISTENING ON ',nodeServerPort)
});


