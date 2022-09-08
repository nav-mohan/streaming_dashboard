export default function fetchLogout({nodeBaseUrl,logoutPath,postBody}){
    return fetch(nodeBaseUrl+logoutPath, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:postBody
    })
    .then(function(res){
        if(res.status==200){
            return res.json();
        }
        throw new Error('Logout attempt res.status='+res.status);
    })
}