/**
 * You can login with Formdata = (username,password) or Formdata = (email,password)
*/

var jsonwebtoken                 = require('jsonwebtoken');
const {wordpressBaseUrl,
    wordpressJwtLoginPath,
    wordpressJwtAuthKey,
    deployEnvironment,
    secretServerKey}  = require('./config');
const express           = require('express');
const https             = require('https');

 // prepare the fetch options 
const wpOptions = {
    hostname: wordpressBaseUrl,
    port: 443,
    path: wordpressJwtLoginPath,
    method: 'POST',
    headers:{"Content-Type":"application/json"},
    //Must update fm949's SSL certificate to WebNames
    rejectUnauthorized: (deployEnvironment === 'DEVELOPMENT') ? false : true,
};

// prepare the postData with the Wordpress JWT Auth Key (Not the secretServerKey)
const postData = {'AUTH_KEY':wordpressJwtAuthKey};
 
const loginRouter       = express.Router();

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

const wpResOnEnd = function(dataBuffer,wpRes,nodeRes){
    console.log('wpResOnEnd',dataBuffer)
    let jwtPayload;
    try {
        jwtPayload = JSON.parse(dataBuffer)
    } catch (error) {
        console.log('Unable to parse jwtPayloadBuffer',error);
        nodeRes.send({
            'success':false,
            "wpStatusCode":wpRes.statusCode,
            "wpStatusMessage":wpRes.statusMessage,
            "error":error
        })
        return;
    }
    if(wpRes.statusCode!==200){
        console.log('WP Login Failed with',wpRes.statusMessage);
        nodeRes.send({
            'success':false,
            "wpStatusCode":wpRes.statusCode,
            "wpStatusMessage":wpRes.statusMessage,
            "error":jwtPayload.data.message
        })
        return;
    }
    if(
        jwtPayload.success==true && 
        jwtPayload.data && 
        jwtPayload.data.jwt && 
        jwtPayload.user_info &&
        jwtPayload.user_info.roles   
    ){
        console.log('Authenticated - Now checking for Admin Role')
        if(!jwtPayload.user_info.roles.includes('administrator')){
            console.log("Imposter! not an admin!");
            nodeRes.send({
                'success':false,
                'wpStatusCode':wpRes.statusCode,
                'wpStatusMessage':wpRes.statusMessage,
                'error':"Imposter! You are not an admin!"
            })
            return;
        }
        jsonwebtoken.verify(jwtPayload.data.jwt,secretServerKey,(error,decoded) => {
            if(error){
                console.log(error)
                nodeRes.send({
                    'success':false,
                    'wpStatusCode':wpRes.statusCode,
                    'wpStatusMessage':wpRes.statusMessage,
                    'error':`Malformed JWT received ${error}`
                })
                return;
            }
            nodeRes.send({
                "success":true,
                "jwt":jwtPayload.data.jwt,
                "jwtExp":decoded.exp,
                "userLogin":jwtPayload.user_info.data.user_login,
                "userPass":jwtPayload.user_info.data.user_pass,
                "userNiceName":jwtPayload.user_info.data.user_nicename,
                "userDisplayName":jwtPayload.user_info.data.display_name,
                "userRoles":jwtPayload.user_info.roles,
            });
        })
        return;
    }
}

loginRouter.post('/',(nodeReq,nodeRes)=>{
    var loginPostBuffer = '';
    nodeReq.on('data',(d)=>{loginPostBuffer+=(d.toString());});
    nodeReq.on('end',()=>{
        decodeForm(loginPostBuffer);
        var wpReq = https.request(wpOptions,(wpRes)=>{
            var jwtPayloadBuffer = '';
            wpRes.on('data',(d)=>{jwtPayloadBuffer+=(d.toString())})
            wpRes.on('end',()=>{wpResOnEnd(jwtPayloadBuffer,wpRes,nodeRes)})
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
    loginRouter
}