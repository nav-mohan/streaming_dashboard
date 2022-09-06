export default function fetchLogin({nodeBaseUrl,loginPath,postBody}){
    return fetch(nodeBaseUrl+loginPath, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:postBody
    })
    .then(function(res){
        if(res.status==200){
            return res.json();
        }
        throw new Error('Login attempt res.status='+res.status);
    })
}