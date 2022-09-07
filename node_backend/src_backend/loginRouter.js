/**
 * You can login with Formdata = (username,password) or Formdata = (email,password)
 */

var jwt                 = require('jsonwebtoken');
const {wordpressBaseUrl,
    wordpressJwtLoginPath,
    wordpressJwtAuthKey,
    deployEnvironment,
    secretServerKey}  = require('./config');
const express           = require('express');
const https             = require('https');

// prepare the fetch options 
const loginOptions = {
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

loginRouter.post('/', (nodeLoginRequest,nodeLoginResponse)=>{
    console.log("RECEIVED LOGIN REQUEST");
    
    // receive the Login Form from React
    var nodeLoginBodyBuffer = [];
    nodeLoginRequest.on("data", (d) => {
        console.log("HELLO");
        nodeLoginBodyBuffer.push(d)
    })

    nodeLoginRequest.on("end", () => {
        console.log("Login Form Received from React");

        // Do Some Sanitization of the Login Form here -- but for what?
        
        // prepare the Login Form for Wordpress
        try {
            var nodeLoginBody = decodeURIComponent(nodeLoginBodyBuffer).split("&");
            console.log(nodeLoginBodyBuffer.toString());
            nodeLoginBody.forEach(loginDetail => {
                postData[loginDetail.split("=")[0]] = loginDetail.split("=")[1];
            });
        } 
        catch (error) {
            console.log('Unable to decode Login Form');
            console.log(error);
        }

        // forward the Login Form to Wordpress
        var wpLoginRequest = https.request(loginOptions, (wpLoginResponse) => {
            
            var jwtPayloadBuffer = [];
            wpLoginResponse.on('data', (d) => {
                // process.stdout.write(d);
                jwtPayloadBuffer.push(d.toString())
            });
            
            wpLoginResponse.on("end",async () => {

                console.log("Received Wordpress response to auth attempts")
                console.log(jwtPayloadBuffer)
                
                // try parsing the payload
                try{
                    jwtPayload = await JSON.parse(jwtPayloadBuffer);
                }
                catch(error){
                    console.log("Unable to parse jwtPayloadBuffer")
                    console.log(error)
                    nodeLoginResponse.send({
                        'success':false,
                        "wpStatusCode":wpLoginResponse.statusCode,
                        "wpStatusMessage":wpLoginResponse.statusMessage,
                        "erroDetails":error
                    })
                    return;
                }
                
                // if the auth attempt failed
                if(wpLoginResponse.statusCode !== 200){
                    console.log("Wordpress Login Failed with ",wpLoginResponse.statusMessage)
                    nodeLoginResponse.send({
                        'success':false,
                        "wpStatusCode":wpLoginResponse.statusCode,
                        "wpStatusMessage":wpLoginResponse.statusMessage,
                        "wpPayloadMessage":jwtPayload.data.message
                    })
                    return;
                }

                
                // if the auth attempt succeeded
                if(
                    jwtPayload.success==true && 
                    jwtPayload.data && 
                    jwtPayload.data.jwt && 
                    jwtPayload.user_info &&
                    jwtPayload.user_info.roles
                    ){
                        console.log(jwtPayload.user_info.roles)
                        if(jwtPayload.user_info.roles.includes('administrator')){
                            console.log("Welcome Admin!")
                            // Decode the JWT to get the JWT expiry time
                            jwt.verify(jwtPayload.data.jwt,secretServerKey,(error,decoded) => {
                                if(error){
                                    console.log(error)
                                    nodeLoginResponse.send({
                                        'success':false,
                                        'wpStatusCode':wpLoginResponse.statusCode,
                                        'wpStatusMessage':wpLoginResponse.statusMessage,
                                        'errorDetails':`Malformed JWT received ${error}`
                                    })
                                    return;
                                }
                                nodeLoginResponse.send({
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
                        else{
                            console.log("Imposter! not an admin!");
                            nodeLoginResponse.send({
                                'success':false,
                                'wpStatusCode':wpLoginResponse.statusCode,
                                'wpStatusMessage':wpLoginResponse.statusMessage,
                                'wpPayloadMessage':"Imposter! You are not an admin!"
                            })
                            return;
                        }
                    return;
                }
                else{
                    console.log("jwtPayload missing some properties")
                    console.log(jwtPayload)
                    nodeLoginResponse.send({
                        'success':false,
                        'wpStatusCode':wpLoginResponse.statusCode,
                        'wpStatusMessage':wpLoginResponse.statusMessage,
                        'errorDetails':`jwtPayload missing some properties`
                    });
                    return;
                }
            })
        });

        // if Node fails to connect to Wordpress
        wpLoginRequest.on('error', (error) => {
            console.error("wpLoginError");
            console.log(error)
            console.log(wpLoginRequest)
            nodeLoginResponse.send({
                "success":false,
                "wpStatusCode":500,
                "wpStatusMessage":"Wordpress site is probably down",
                "wpErrorMessage":error
            })
        });

        // Send the AUTH_KEY for the plugin
        wpLoginRequest.write(JSON.stringify(postData));

        // End of transaction
        wpLoginRequest.end();
    })
})
    
module.exports = {
    loginRouter
}