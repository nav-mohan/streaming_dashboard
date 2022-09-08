function prepareLoginPost({
    inputUsernameEmail, inputPassword
}){
    if(inputUsernameEmail.includes("@"))
        return( encodeURIComponent(`email=${inputUsernameEmail}`) + "&" + encodeURIComponent(`password=${inputPassword}`) );
    else
        return( encodeURIComponent(`username=${inputUsernameEmail}`) + "&" + encodeURIComponent(`password=${inputPassword}`) );
}

module.exports={prepareLoginPost}