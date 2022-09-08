function prepareLogoutPost({jwt}){
    if(jwt)
        return(encodeURIComponent(`JWT=${jwt}`));
    else
        return;
}

module.exports={prepareLogoutPost}