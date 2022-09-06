import React, { useState } from "react";
import { handleLogin } from "./handleLogin";

export default function LoginForm({setAuthState}){
    
    // Form fillins
    const [inputUsernameEmail,setInputUsernameEmail] = useState('');
    const [inputPassword,setInputPassword] = useState('');
    
        return(
            <div>
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
                        setAuthState
                        })
                }}>
                    Login
                </button>
            </div>
        )
}
