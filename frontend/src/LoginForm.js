import React, { useState } from "react";
import { preparePostBody } from "./preparePostBody";
import { fetchLogin } from "./fetchLogin";
import { nodeBaseUrl,loginPath } from "./config"


const handleLogin = function({
    inputUsernameEmail,
    inputPassword,
    setUsername,
    setAuthToken,
    setIsAuthenticated,
    setWarning
}){
    var postBody = preparePostBody({inputUsernameEmail,inputPassword})
    fetchLogin({nodeBaseUrl,loginPath,postBody})
    .then(res_json=>{
        console.log('reS_json',res_json)
        if(res_json.success==true){
            setUsername(res_json.userLogin)
            setAuthToken(res_json.jwt)
            setIsAuthenticated(true)
        }
        else{
            setWarning(JSON.stringify(res_json.wpPayloadMessage))
        }
    })
    .catch((error)=>{
        console.log('BIG ERROR!',error)
    })
}


export default function LoginForm({
    setAuthToken,setUsername,setIsAuthenticated
}){
    const [inputUsernameEmail,setInputUsernameEmail] = useState('');
    const [inputPassword,setInputPassword] = useState('');

    return(
        <div>
            <div>{warning}</div>
            <div>
                <input 
                    type='text'
                    placeholder="username/email"
                    value = {inputUsernameEmail} 
                    onChange={(e)=>{setInputUsernameEmail(e.target.value)}}
                    />
                <input 
                    type='password' 
                    placeholder="password"
                    value = {inputPassword} 
                    onChange={(e)=>{setInputPassword(e.target.value)}}
                />
            </div>
            <button onClick={(e)=>{
                handleLogin({
                    inputUsernameEmail,
                    inputPassword,
                    setUsername,
                    setAuthToken,
                    setIsAuthenticated,
                    })
            }}>Login</button>
        </div>
    )
}
