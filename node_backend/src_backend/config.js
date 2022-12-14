const dotenv = require('dotenv');
dotenv.config();

const secretServerKey = process.env.SECRET_SERVER_KEY;
const nodeServerPort = process.env.NODE_SERVER_PORT;
const clientOriginUrl = process.env.CLIENT_ORIGIN_URL;
const wordpressBaseUrl = process.env.WORDPRESS_BASE_URL;
const wordpressJwtAuthKey = process.env.WORDPRESS_JWT_AUTH_KEY
const wordpressJwtLoginPath = process.env.WORDPRESS_JWT_LOGIN_PATH;
const wordpressJwtValidatePath = process.env.WORDPRESS_JWT_VALIDATE_PATH;
const wordpressJwtRefreshPath = process.env.WORDPRESS_JWT_REFRESH_PATH;
const wordpressJwtRevokePath = process.env.WORDPRESS_JWT_REVOKE_PATH;
const obsUserRole = process.env.OBS_USER_ROLE;
const deployEnvironment = process.env.DEPLOY_ENVIRONMENT;

if (!secretServerKey) {
    throw new Error(".env is missing SECRET_SERVER_KEY");
}

if (!nodeServerPort) {
    throw new Error(".env is missing NODE_SERVER_PORT");
}

if (!clientOriginUrl) {
    throw new Error(".env is missing CLIENT_ORIGIN_URL");
}

if (!wordpressBaseUrl) {
    throw new Error(".env is missing WORDPRESS_BASE_URL");
}

if (!wordpressJwtAuthKey) {
    throw new Error(".env is missing WORDPRESS_JWT_AUTH_KEY");
}

if (!wordpressJwtLoginPath) {
    throw new Error(".env is missing WORDPRESS_JWT_LOGIN_PATH");
}
if (!wordpressJwtValidatePath) {
    throw new Error(".env is missing WORDPRESS_JWT_VALIDATE_PATH");
}
if (!wordpressJwtRefreshPath) {
    throw new Error(".env is missing WORDPRESS_JWT_REFRESH_PATH");
}
if (!wordpressJwtRevokePath) {
    throw new Error(".env is missing WORDPRESS_JWT_REVOKE_PATH");
}
if (!obsUserRole) {
    throw new Error(".env is missing OBS_USER_ROLE");
}

const clientOrigins = ["http://localhost:3000"];

if (!deployEnvironment) {
    throw new Error(".env is missing DEPLOY_ENVIRONMENT")
}

module.exports = {
    secretServerKey,
    nodeServerPort,
    clientOriginUrl,
    clientOrigins,
    wordpressBaseUrl,
    wordpressJwtAuthKey,
    wordpressJwtLoginPath,
    wordpressJwtValidatePath,
    wordpressJwtRefreshPath,
    wordpressJwtRevokePath,
    obsUserRole,
    deployEnvironment
};

