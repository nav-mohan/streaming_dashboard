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

const wpOptions = {
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

const decodeForm = function(dataBuffer){
    // Do some sanitization here
    try{
        const data = decodeURIComponent(dataBuffer).split('&');
        data.forEach(el => {
            postData[el.split("=")[0]] = el.split("=")[1]
        });
    }
    catch(error){
        console.log(error);
    }
}

const wpResOnEnd = function(
    dataBuffer,
    wpStatusCode,
    wpStatusMessage,
    nodeRes
    ){
        let revokePayload;
        try {
            revokePayload = JSON.parse(dataBuffer)
            console.log(revokePayload)
        } catch (error) {
            console.log('Unable to parse dataBuffer',error);
            nodeRes.send({
                'success':false,
                "wpStatusCode":wpStatusCode,
                "wpStatusMessage":wpStatusMessage,
                "error":error
            })
            return;
        }
        if(wpStatusCode!==200){
            nodeRes.send({
                'success':false,
                "wpStatusCode":wpStatusCode,
                "wpStatusMessage":wpStatusMessage,
                "error":revokePayload.data.message
            })
            return;
        }
        if(revokePayload.success==true){
            io.fetchSockets().then(sockets=>{
                sockets.forEach(s => {
                    if(
                        s.handshake.headers && 
                        s.handshake.headers.authorization && 
                        s.handshake.headers.authorization == revokePayload.data.jwt
                    ){
                        s.disconnect();
                    }
                });
            });

            nodeRes.send({
                'success':true,
                "wpStatusCode":wpStatusCode,
                "wpStatusMessage":wpStatusMessage,
                "error":null
            })
            return;
        }
    }

logoutRouter.post('/',(nodeReq,nodeRes)=>{

    var logoutPostBuffer = '';
    nodeReq.on('data',(d)=>{logoutPostBuffer+=(d.toString());});

    nodeReq.on('end',()=>{
        decodeForm(logoutPostBuffer);
        var wpReq = https.request(wpOptions,(wpRes)=>{
            var logoutBuffer = '';
            wpRes.on('data',(d)=>{logoutBuffer+=(d.toString())});
            wpRes.on('end',()=>{wpResOnEnd(logoutBuffer,wpRes.statusCode,wpRes.statusMessage,nodeRes)});
        })
        wpReq.write(JSON.stringify(postData));
        
        wpReq.on('error',(error)=>{
            nodeRes.send({
                "success":false,
                "wpStatusCode":500,
                "wpStatusMessage":"Wordpress site is probably down",
                "error":error
            })
        })
        wpReq.end();
    });

    nodeReq.on('error',(error)=>{
        console.log('nodeReq Error:', error);
    })
})


    
module.exports = {
    logoutRouter
}