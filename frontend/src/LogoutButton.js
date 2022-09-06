import React, { useState,useContext } from "react";

export default function LogoutButton({setAuthState}){
    return(
        <button onClick={(e)=>{
            setAuthState({
                username:'',
                jwt:'',
                })
        }}>Logout</button>
    )
}
