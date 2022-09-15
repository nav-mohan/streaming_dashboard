import React, {useContext } from "react";
import { AuthContext } from "./AuthContext";
import LoginForm from "./LoginForm";
import LogoutButton from "./LogoutButton";

export default function LoginLogout(){
    // authentication context
    const {authState,setAuthState} = useContext(AuthContext);
    
    if(!authState.username || authState.exp < new Date().getTime()){
        return(
            <LoginForm setAuthState={setAuthState}/>
        )
    }
    else{
        return(
            <LogoutButton authState = {authState} setAuthState={setAuthState}/>
        )
    }
}
