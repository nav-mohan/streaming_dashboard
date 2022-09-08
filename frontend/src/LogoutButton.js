import React from "react";
import {handleLogout} from "./handleLogout"

export default function LogoutButton({authState,setAuthState}){
    const jwt = authState.jwt;
    return(
        <button onClick={(e)=>{
            handleLogout({jwt,setAuthState})
        }}>Logout</button>
    )
}
