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
        if(res_json.success==true){
            setAuthState({'username':'','jwt':'','exp':0});//this unmounts SocketContext.Provider
            alert('You have logged out!')
        }
        else{
            alert(JSON.stringify(res_json.error));
        }
    })
    .catch((error)=>{
            setAuthState({'username':'','jwt':'','exp':0});//this unmounts SocketContext.Provider
            console.log('BIG ERROR!',error);
    })
}