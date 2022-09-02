import {nodeBaseUrl,loginPath} from "../config";

export default function fetchLogin({postBody}){
    return fetch(nodeBaseUrl+loginPath, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:postBody
    })
    .then(function(res){
        if(res.status==200){
            console.log('res',res)
            return res.json();
        }
        throw new Error('Login attempt res.status='+res.status);
    })
}