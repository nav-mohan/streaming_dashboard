import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";


export default function Dashboard(){
    const {authState} = useContext(AuthContext);
    if(!authState.username || authState.exp < new Date().getTime()){
        return(
            <div>You need to login</div>
        )
    }
    else{
        return(
            <div>Go ahead man!</div>
        )
    }
}