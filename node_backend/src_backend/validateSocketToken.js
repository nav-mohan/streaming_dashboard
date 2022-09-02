var jwt = require('jsonwebtoken');
const https             = require('https');

const { 
    secretServerKey,
    wordpressJwtValidatePath,
    wordpressBaseUrl,
    deployEnvironment
} = require('./config');


const validateToken = async function(authToken){
    console.log('validating',authToken);
    return true;
    var validateOptions = {
        hostname: wordpressBaseUrl,
        port: 443,
        path: wordpressJwtValidatePath+authToken,
        method: 'GET',
        headers:{"Content-Type":"application/json"},
        //Must update fm949's SSL certificate to WebNames
        rejectUnauthorized: (deployEnvironment === 'DEVELOPMENT') ? false : true,
    };
    // Forwarding to wordpress
    var wpValidateRequest = https.request(validateOptions, async (wpValidateResponse)=>{
        var resBuffer = [];
        
        wpValidateResponse.on('data',(d)=>{
            console.log("RECEIVED DATA")
            resBuffer.push(d.toString());
        })

        wpValidateResponse.on('end',async ()=>{
            try {
                var res_json = JSON.parse(await resBuffer);
                if(res_json.success==true && res_json.data.roles.includes('administrator')){
                    return true;
                }
            } catch (error) {
                console.log(error)
                return false
            }
        })
    })

    wpValidateRequest.on('error', (error) => {
        console.error("Validate JWT Error");
        console.log(error)
        return false;
    });
    wpValidateRequest.end();

 }

module.exports={validateToken}