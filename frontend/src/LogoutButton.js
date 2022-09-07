import React from "react";

export default function LogoutButton({setAuthState}){
    return(
        <button onClick={(e)=>{
            setAuthState({
                'username':'',
                'jwt':'',
                'exp':0
                })
        }}>Logout</button>
    )
}
