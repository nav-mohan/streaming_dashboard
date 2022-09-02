import React from "react";
import Dashboard from "./Dashboard";
import LoginForm from "./LoginForm";

export default function Home({
    authToken,
    username,
    setAuthToken,
    setUsername,
    isAuthenticated,
    setIsAuthenticated
}){
    if(!isAuthenticated || !authToken){
        return (
              <LoginForm 
                setAuthToken={setAuthToken} 
                setUsername={setUsername} 
                setIsAuthenticated={setIsAuthenticated}
            />
        )
    }
    else{
        return(
            <Dashboard 
                authToken={authToken}
                username={username}
            />
        )
    }
}