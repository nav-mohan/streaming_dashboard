import React, {useContext } from "react";
import { AuthContext } from "./AuthContext";
import LoginForm from "./LoginForm";
import LogoutButton from "./LogoutButton";

export default function AuthForm(){
    // authentication context
    const {authState,setAuthState} = useContext(AuthContext);
    
    if(!authState.username || authState.exp < new Date().getTime()){
        return(
            <LoginForm setAuthState={setAuthState}/>
        )
    }
    else{
        return(
            <LogoutButton setAuthState={setAuthState}/>
        )
    }
}
