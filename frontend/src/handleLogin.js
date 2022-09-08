import { prepareLoginPost } from "./prepareLoginPost";
import fetchLogin from "./fetchLogin";
import { nodeBaseUrl,loginPath } from "./config"

export const handleLogin = function({
    inputUsernameEmail,
    inputPassword,
    setAuthState
}){
    var postBody = prepareLoginPost({inputUsernameEmail,inputPassword})
    fetchLogin({nodeBaseUrl,loginPath,postBody})
    .then(res_json=>{
        console.log('res_json',res_json);
        if(res_json.success==true){
            setAuthState({
                'username':res_json.userLogin,
                'jwt':res_json.jwt,
                'exp':res_json.jwtExp*1000
            });
        }
        else{
            alert(JSON.stringify(res_json.error));
        }
    })
    .catch((error)=>{
        console.log('BIG ERROR!',error);
    })
}