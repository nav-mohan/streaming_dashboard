const dotenv = require('dotenv');
dotenv.config();

var nodeBaseUrl;

const secretServerKey       = process.env.SECRET_SERVER_KEY;
const serverPort            = process.env.NODE_SERVER_PORT;
const clientOriginUrl       = process.env.CLIENT_ORIGIN_URL;
const wordpressBaseUrl      = process.env.WORDPRESS_BASE_URL;
const wordpressJwtAuthKey   = process.env.WORDPRESS_JWT_AUTH_KEY
const wordpressJwtLoginPath = process.env.WORDPRESS_JWT_LOGIN_PATH;
const wordpressJwtValidatePath = process.env.WORDPRESS_JWT_VALIDATE_PATH;
const wordpressJwtRefreshPath = process.env.WORDPRESS_JWT_REFRESH_PATH;
const wordpressJwtRevokePath = process.env.WORDPRESS_JWT_REVOKE_PATH;
const deployEnvironment     = process.env.DEPLOY_ENVIRONMENT;

if(!secretServerKey){
    throw new Error(".env is missing SECRET_SERVER_KEY");
}

if(!serverPort){
    throw new Error(".env is missing SERVER_PORT");
}

if(!clientOriginUrl){
    throw new Error(".env is missing CLIENT_ORIGIN_URL");
}

if(!wordpressBaseUrl){
    throw new Error(".env is missing WORDPRESS_BASE_URL");
}

if(!wordpressJwtAuthKey){
    throw new Error(".env is missing WORDPRESS_JWT_AUTH_KEY");
}

if(!wordpressJwtLoginPath){
    throw new Error(".env is missing WORDPRESS_JWT_LOGIN_PATH");
}
if(!wordpressJwtValidatePath){
    throw new Error(".env is missing WORDPRESS_JWT_VALIDATE_PATH");
}
if(!wordpressJwtRefreshPath){
    throw new Error(".env is missing WORDPRESS_JWT_REFRESH_PATH");
}
if(!wordpressJwtRevokePath){
    throw new Error(".env is missing WORDPRESS_JWT_REVOKE_PATH");
}

const clientOrigins = ["http://localhost:3000"];

if(!deployEnvironment){
    throw new Error(".env is missing DEPLOY_ENVIRONMENT")
}

if(deployEnvironment === "DEVELOPMENT"){
    nodeBaseUrl = `http://localhost:${serverPort}`;
}
if(deployEnvironment === "PRODUCTION"){
    nodeBaseUrl = `${wordpressBaseUrl}:${serverPort}`;
}

module.exports = {
    secretServerKey,
    serverPort,
    clientOriginUrl,
    clientOrigins,
    nodeBaseUrl,
    wordpressBaseUrl,
    wordpressJwtAuthKey,
    wordpressJwtLoginPath,
    wordpressJwtValidatePath,
    wordpressJwtRefreshPath,
    wordpressJwtRevokePath,
    deployEnvironment
  };
  
