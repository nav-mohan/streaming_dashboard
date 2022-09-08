/**
 * You can logout with Formdata = (username,password) or Formdata = (email,password)
 */

var jwt                 = require('jsonwebtoken');
const {wordpressBaseUrl,
    wordpressJwtRevokePath,
    wordpressJwtAuthKey,
    deployEnvironment,
    secretServerKey}  = require('./config');
const express           = require('express');
const https             = require('https');
const { io } = require('./socket');

const wpFetchOptions = {
    hostname: wordpressBaseUrl,
    port: 443,
    path: wordpressJwtRevokePath,
    method: 'POST',
    headers:{"Content-Type":"application/json"},
    //Must update fm949's SSL certificate to WebNames
    rejectUnauthorized: (deployEnvironment === 'DEVELOPMENT') ? false : true,
};
const postData = {'AUTH_KEY':wordpressJwtAuthKey};

const logoutRouter = express.Router();

const forwardToWordpress = function(wpLogoutResponse){
    var jwtPayloadBuffer = [];
    wpLogoutResponse.on('data', (d) => {
        // process.stdout.write(d);
        jwtPayloadBuffer.push(d.toString())
    });
    wpLogoutResponse.on("end",async () => {
        console.log("Received Wordpress response to logout attempt")
        console.log(jwtPayloadBuffer)})
        io.close()
}

const onNodeEnd = function(nodeLogoutBodyBuffer){
    console.log('Node Logout Request Received');
    // Do Some Sanitization of the Logout Form here -- but for what?
    
    // prepare the JWT-Revoke Form for Wordpress
    try {
        var nodeLogoutBody = decodeURIComponent(nodeLogoutBodyBuffer).split("&");
        console.log(nodeLogoutBodyBuffer.toString());
        nodeLogoutBody.forEach(logoutDetail => {
            postData[logoutDetail.split("=")[0]] = logoutDetail.split("=")[1];
        });
    } 
    catch (error) {
        console.log('Unable to decode Logout Form');
        console.log(error);
    }

    var wpLogoutRequest = https.request(wpFetchOptions, forwardToWordpress)
    
    // Send the AUTH_KEY for the plugin
    // wpLogoutRequest.write(JSON.stringify(postData));

    // End of transaction
    wpLogoutRequest.end();
}


logoutRouter.post('/', (nodeLogoutRequest,nodeLogoutResponse)=>{
    console.log("LOGGING OUT");
    console.log(Object.keys(nodeLogoutRequest.socket))
    // receive the Logout Form from React
    var nodeLogoutBodyBuffer = [];
    nodeLogoutRequest.on("data", (d) => {
        console.log("HELLO");
        nodeLogoutBodyBuffer.push(d)
    })

    // Initialize the postData with the Wordpress JWT Auth Key (Not the secretServerKey)
    var postData = {'AUTH_KEY':wordpressJwtAuthKey};

    nodeLogoutRequest.on('end',()=>{onNodeEnd(nodeLogoutBodyBuffer)})
})


    
module.exports = {
    logoutRouter
}