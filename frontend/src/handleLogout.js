import { prepareLogoutPost } from "./prepareLogoutPost"
import fetchLogout from "./fetchLogout"
import { nodeBaseUrl,logoutPath } from "./config"

export const handleLogout = function({
    jwt,
    setAuthState
}){
    var postBody = prepareLogoutPost({jwt})
    fetchLogout({nodeBaseUrl,logoutPath,postBody})
    .then(res_json=>{
        console.log('res_json',res_json);
        if(res_json.success==true){
            setAuthState({'username':'','jwt':'','exp':0});
        }
        else{
            alert(JSON.stringify(res_json.wpPayloadMessage));
        }
    })
    .catch((error)=>{
        console.log('BIG ERROR!',error);
    })
}